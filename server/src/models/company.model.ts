import mongoose, { Document, Schema } from "mongoose";
import { Industries } from "./industries.model";
import { Major } from "./majors.model";

interface ICompany extends Document {
  name: string;
  website: string;
  logo: string; // link to S3 bucket entry
  description: string;
  industries: Industries[];
  majorsHiring: Major[];
  positionTypes: ("Internship" | "Full-Time" | "Co-Op")[];
  degreeLevelsHiring: ("Bachelors" | "Masters" | "PhD")[];
  workAuthsHiring: (
    | "US Citizen"
    | "Legally authorized to work in the US"
    | "Seeking sponsorship"
  )[];
  jobPostings: string[];
  representatives: mongoose.Types.ObjectId[];
  mainRepresentative: mongoose.Types.ObjectId;
  package?: "Basic" | "Silver" | "Gold" | "Diamond" | "Platinum" | "Maroon";
  boothLocation?: string;
  interactions?: mongoose.Types.ObjectId[];
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  website: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  industries: [{ type: String, enum: Object.values(Industries) }],
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
    required: true,
  },
  package: {
    type: String,
    enum: ["Basic", "Silver", "Gold", "Diamond", "Platinum", "Maroon"],
  },
  boothLocation: { type: String },
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interaction" }],
});

const Company = mongoose.model<ICompany>("Company", companySchema);

export { Company };
