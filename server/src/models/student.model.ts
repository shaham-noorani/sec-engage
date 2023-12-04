import mongoose, { Document, Schema } from "mongoose";
import { Major } from "./majors.model"; // Assuming Major is a Mongoose model or enum
import { Industries } from "./industries.model"; // Assuming Industries is an enum

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
  interactions: mongoose.Types.ObjectId[];
}

const studentSchema = new Schema<IStudent>({
  fullname: { type: String, required: true },
  UIN: { type: String, required: true, unique: true },
  major: { type: String, enum: Object.values(Major), required: true }, // Adjust based on Major's structure
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
  industriesSeeking: [{ type: String, enum: Object.values(Industries) }], // Adjust based on Industries' structure
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interaction" }],
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export { Student };
