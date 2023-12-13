import Industry from "./industry";
import Major from "./major";
import Representative from "./representative";

interface Company extends Document {
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
  representatives?: Representative[];
  mainRepresentative?: string;
  package?: "Basic" | "Silver" | "Gold" | "Diamond" | "Platinum" | "Maroon";
  boothLocation?: string;
  interactions?: string[] | null;
  companyCode?: string;
}

export default Company;
