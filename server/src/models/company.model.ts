import { Industries } from "./industries.model";
import { Major } from "./majors.model";

import mongoose from "mongoose";

interface Company {
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

export { Company };
