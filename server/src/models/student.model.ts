import mongoose, { Document, Schema } from "mongoose";

import { Major } from "./majors.model";
import { Industries } from "./industries.model";

interface IStudent extends Document {
  fullname: string;
  UIN: string;
  major: Major;
  resume: string;
  GPA?: number;
  linkedin?: string;
  gender?: "M" | "F" | "O";
  ethnicity?: "White" | "Black" | "Hispanic" | "Asian" | "Other";
  graduationSemester: "Fall" | "Spring";
  graduationYear: number;
  positionTypeSeeking: ("Internship" | "Full-Time" | "Co-Op")[];
  industriesSeeking: Industries[];
  interactions?: mongoose.Types.ObjectId[];
  favoritedCompanies?: mongoose.Types.ObjectId[];
}

const studentSchema = new Schema<IStudent>({
  fullname: { type: String, required: true },
  UIN: { type: String, required: true, unique: true },
  major: { type: String, enum: Object.values(Major), required: true },
  resume: { type: String, required: true },
  GPA: { type: Number },
  linkedin: { type: String },
  gender: { type: String, enum: ["M", "F", "O"] },
  ethnicity: {
    type: String,
    enum: ["White", "Black", "Hispanic", "Asian", "Other"],
  },
  graduationSemester: {
    type: String,
    enum: ["Fall", "Spring"],
    required: true,
  },
  graduationYear: { type: Number, required: true },
  positionTypeSeeking: [
    { type: String, enum: ["Internship", "Full-Time", "Co-Op"] },
  ],
  industriesSeeking: [{ type: String, enum: Object.values(Industries) }],
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interaction" }],
  favoritedCompanies: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  ],
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export { Student };
