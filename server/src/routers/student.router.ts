import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "src/controllers/student.controller";

const StudentRouter = Router();

StudentRouter.get("/:id", getStudentById);

StudentRouter.get("/", getAllStudents);

StudentRouter.post("/", createStudent);

StudentRouter.put("/:id", updateStudent);

StudentRouter.delete("/:id", deleteStudent);

export default StudentRouter;
