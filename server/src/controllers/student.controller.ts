import { Request, Response } from "express";
import { Student } from "../models/student.model";

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);

    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  const newStudent = new Student(req.body);

  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = req.body;

  const updatedStudent = await Student.findByIdAndUpdate(id, student, {
    new: true,
  });

  res.json(updatedStudent);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Student.findByIdAndDelete(id);

  res.json({ message: "Student deleted successfully." });
};
