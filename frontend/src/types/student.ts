import Major from "./major";
import Industry from "./industry";

interface Student {
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
  interactions?: string[];
  favoritedCompanies?: string[];

  admin: boolean;
}

export default Student;
