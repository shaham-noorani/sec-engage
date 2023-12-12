interface StudentInLine {
  studentId: string;
  phoneNumber: string;
  name: string;
  ticketCode: string;
  joinedAt?: Date;
  notifiedAt?: Date | null;
}

export default StudentInLine;
