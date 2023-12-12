import { Request, Response, Router } from "express";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";
import { Student } from "../models/student.model";
import { Representative } from "../models/representative.model";
import { Major } from "../models/major.model";

export const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

export const getUserInformationFromToken = async (idToken: string) => {
  const ticket = await oAuth2Client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  if (!payload) throw new Error("Invalid token");

  return {
    email: payload.email as string,
  };
};

export async function anyUserAuthMiddleware(
  request: Request,
  response: Response,
  next: any
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response
      .status(401)
      .json({ error: "Authorization header is missing" });
  }

  const idToken = authHeader.split(" ")[1]; // Bearer <token>

  if (!idToken) {
    return response.status(401).json({ error: "No token provided" });
  }

  let email: string;
  try {
    email = (await getUserInformationFromToken(idToken)).email;
  } catch (err) {
    return response.status(401).json({ error: "Invalid token" });
  }

  request.query.email = email;

  next();
}

export async function studentAuthMiddleware(
  request: Request,
  response: Response,
  next: any
) {
  const email = request.query.email;

  // check if email exists in Student collection
  const studentExists = await Student.exists({ email: email });
  if (!studentExists) {
    return response.status(401).json({ error: "Must be a student to access" });
  }

  next();
}

export async function representativeAuthMiddleware(
  request: Request,
  response: Response,
  next: any
) {
  const email = request.query.email;

  // check if email exists in Representative collection
  const representativeExists = await Representative.exists({ email: email });
  if (!representativeExists) {
    const student = await Student.findOne({ email: email });

    if (!student.admin) {
      return response
        .status(401)
        .json({ error: "Must be a representative to access" });
    }
  }

  next();
}

export async function adminAuthMiddleware(
  request: Request,
  response: Response,
  next: any
) {
  const email = request.query.email;

  const student = await Student.findOne({ email: email });

  if (!student.admin) {
    return response.status(401).json({ error: "Must be an admin to access" });
  }

  next();
}

export const createStudentIfEmailNotFound = async (email: string) => {
  // see if email exists in Student colletion
  const studentExists = await Student.exists({ email: email });
  const representativeExists = await Representative.exists({ email: email });

  // if email does not exist, create a new student
  if (!studentExists && !representativeExists) {
    const newStudent = new Student({
      email: email,
      admin: false,
    });

    await newStudent.save();
  }
};

export const refreshCredentials = async (refreshToken: string) => {
  const user = new UserRefreshClient(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    refreshToken
  );
  return await user.refreshAccessToken();
};

const authRouter = Router();

authRouter.post("/google", async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens

  // create a new user if one doesn't exist
  const { email } = await getUserInformationFromToken(tokens.id_token);
  await createStudentIfEmailNotFound(email);

  res.json(tokens);
});

authRouter.post("/google/refresh", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  try {
    const { credentials } = await refreshCredentials(refreshToken);

    res.json({
      id_token: credentials.id_token as string,
      refresh_token: credentials.refresh_token as string,
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
});

authRouter.get("/me", async (req, res) => {
  const idToken = req.headers.authorization.split(" ")[1]; // Bearer <token>

  if (idToken === "undefined") {
    return res.status(401).json({ error: "No token provided" });
  }

  const userInfo = await getUserInformationFromToken(idToken);
  const email = userInfo.email;

  try {
    let user = await Student.findOne({ email: email });
    let role = "student";

    if (user && user.admin == true) {
      role = "admin";
    }

    if (!user) {
      user = await Representative.findOne({ email: email });
      role = "representative";
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      ...user,
      role,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default authRouter;
