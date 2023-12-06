import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/student.controller";
import { studentAuthMiddleware } from "../auth/auth";

const StudentRouter = Router();

StudentRouter.get("/:id", getStudentById);

StudentRouter.get("/", studentAuthMiddleware, getAllStudents);

StudentRouter.post("/", createStudent);

StudentRouter.put("/:id", updateStudent);

StudentRouter.delete("/:id", deleteStudent);

export default StudentRouter;
