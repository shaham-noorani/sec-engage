import mongoose, { Document, Schema } from "mongoose";

import { Major } from "./major.model";
import { Industry } from "./industry.model";

interface IStudent extends Document {
  email: string;
  fullname?: string;
  UIN?: string;
  major?: Major;
  resume?: string;
  GPA?: number;
  linkedin?: string;
  gender?: "M" | "F" | "O";
  ethnicity?: "White" | "Black" | "Hispanic" | "Asian" | "Other";
  graduationSemester?: "Fall" | "Spring";
  graduationYear?: number;
  positionTypeSeeking?: ("Internship" | "Full-Time" | "Co-Op")[];
  workAuth?: "US Citizen" | "Permanent Resident" | "Seeking sponsorship";
  industriesSeeking?: Industry[];
  interactions?: mongoose.Types.ObjectId[];
  favoritedCompanies?: mongoose.Types.ObjectId[];

  admin: boolean;
}

const studentSchema = new Schema<IStudent>({
  fullname: { type: String },
  email: { type: String, unique: true },
  UIN: { type: String },
  major: { type: String, enum: Object.values(Major) },
  resume: { type: String },
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
  },
  graduationYear: { type: Number },
  positionTypeSeeking: [
    { type: String, enum: ["Internship", "Full-Time", "Co-Op"] },
  ],
  workAuth: {
    type: String,
    enum: ["US Citizen", "Permanent Resident", "Seeking sponsorship"],
  },
  industriesSeeking: [{ type: String, enum: Object.values(Industry) }],
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interaction" }],
  favoritedCompanies: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  ],
  admin: { type: Boolean, default: false },
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export { Student, IStudent };
