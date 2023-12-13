import mongoose, { Document, Schema } from "mongoose";
import { Major } from "./major.model";

interface StudentInLine {
  studentId: mongoose.Types.ObjectId;
  phoneNumber: string;
  name: string;
  ticketCode: string;
  joinedAt?: Date;
  notifiedAt?: Date | null;
}

interface Queue extends Document {
  companyId: mongoose.Types.ObjectId;
  companyName: string;
  majors: Major[];
  studentsInLine: StudentInLine[];
}

const queueSchema = new Schema<Queue>({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  companyName: { type: String, required: true },
  majors: [{ type: String, enum: Object.values(Major) }],
  studentsInLine: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      phoneNumber: { type: String, required: true },
      name: { type: String, required: true },
      ticketCode: { type: String, required: true },
      joinedAt: { type: Date, default: Date.now },
      notifiedAt: { type: Date, default: null },
    },
  ],
});

const Queue = mongoose.model<Queue>("Queue", queueSchema);

export { Queue };
