import mongoose, { Document, Schema } from "mongoose";

interface IRepresentative extends Document {
  company?: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  position: string;
  phone: string;
  linkedin?: string;
  interactions?: mongoose.Types.ObjectId[] | null;
}

const representativeSchema = new Schema<IRepresentative>({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  phone: { type: String, required: true },
  linkedin: { type: String },
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interaction" }],
});

const Representative = mongoose.model<IRepresentative>(
  "Representative",
  representativeSchema
);

export { Representative };
