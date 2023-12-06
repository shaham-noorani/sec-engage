import { Request, Response, Router } from "express";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";
import { Student } from "../models/student.model";

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

export async function studentAuthMiddleware(
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

export const createStudentIfEmailNotFound = async (email: string) => {
  try {
    await Student.find({ email });
  } catch (err) {
    const student = new Student({
      email,
    });

    student.save();

    return student;
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

export const refreshAccessToken = async () => {
  return (await refreshCredentials(process.env.GOOGLE_REFRESH_TOKEN as string))
    .credentials.access_token;
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
  const accessToken = await refreshAccessToken();

  res.json({ accessToken });
});

export default authRouter;
