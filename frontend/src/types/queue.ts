import Major from "./major";
import StudentInLine from "./studentInLine";

interface Queue {
  companyId: string;
  companyName: string;
  majors: Major[];
  studentsInLine: StudentInLine[];
}

export default Queue;
