import mongoose, { Document, Schema } from "mongoose";
import { Industry } from "./industry.model";
import { Major } from "./major.model";

interface ICompany extends Document {
  name: string;
  website: string;
  logo: string; // link to S3 bucket entry
  description: string;
  industries: Industry[];
  majorsHiring: Major[];
  positionTypes: ("Internship" | "Full-Time" | "Co-Op")[];
  degreeLevelsHiring: ("Bachelors" | "Masters" | "PhD")[];
  workAuthsHiring: (
    | "US Citizen"
    | "Legally authorized to work in the US"
    | "Seeking sponsorship"
  )[];
  jobPostings?: string[];
  representatives?: mongoose.Types.ObjectId[];
  mainRepresentative?: mongoose.Types.ObjectId;
  package?: "Basic" | "Silver" | "Gold" | "Diamond" | "Platinum" | "Maroon";
  boothLocation?: string;
  interactions?: mongoose.Types.ObjectId[];
  companyCode?: string;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  website: { type: String },
  logo: { type: String },
  description: { type: String },
  industries: [{ type: String, enum: Object.values(Industry) }],
  majorsHiring: [{ type: String, enum: Object.values(Major) }],
  positionTypes: [{ type: String, enum: ["Internship", "Full-Time", "Co-Op"] }],
  degreeLevelsHiring: [{ type: String, enum: ["Bachelors", "Masters", "PhD"] }],
  workAuthsHiring: [
    {
      type: String,
      enum: [
        "US Citizen",
        "Legally authorized to work in the US",
        "Seeking sponsorship",
      ],
    },
  ],
  jobPostings: [{ type: String }],
  representatives: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Representative" },
  ],
  mainRepresentative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Representative",
  },
  package: {
    type: String,
    enum: ["Basic", "Silver", "Gold", "Diamond", "Platinum", "Maroon"],
  },
  boothLocation: { type: String },
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interaction" }],
  companyCode: { type: String, unique: true },
});

const Company = mongoose.model<ICompany>("Company", companySchema);

export { Company };
