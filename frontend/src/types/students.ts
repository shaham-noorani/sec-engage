import Major from "./majors";
import Industry from "./industry";

interface Student {
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
  industriesSeeking: Industry[];
}

export default Student;
