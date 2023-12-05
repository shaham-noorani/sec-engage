import mongoose, { Document, Schema } from "mongoose";

interface IInteraction extends Document {
  studentId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  representativeId: mongoose.Types.ObjectId;
  date: Date;
  studentNotes?: string;
  representativeNotes?: string;
  studentRating?: number;
  representativeRating?: number;
  studentStarred?: boolean;
  representativeStarred?: boolean;
}

const interactionSchema = new Schema<IInteraction>({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  representativeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Representative",
  },
  date: { type: Date, required: true },
  studentNotes: { type: String },
  representativeNotes: { type: String },
  studentRating: { type: Number },
  representativeRating: { type: Number },
  studentStarred: { type: Boolean },
  representativeStarred: { type: Boolean },
});

const Interaction = mongoose.model<IInteraction>(
  "Interaction",
  interactionSchema
);

export { Interaction };
