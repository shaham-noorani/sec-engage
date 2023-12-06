import React, { useEffect, useState } from "react";
import axios from "axios"
import { Box, List, Link, Badge, VStack, Text } from "@chakra-ui/react"

enum Industries {
  "Aerospace",
  "Automotive",
  "Chemical",
  "Civil Engineering",
  "Consulting",
  "Computer and Technology",
  "Construction",
  "Electrical",
  "Energy",
  "Environmental",
  "Finance",
  "Industrial",
  "Manufacturing",
  "Mechanical",
  "Medical Devices",
  "Mining",
  "Pharmaceutical",
  "Software",
  "Telecommunications",
  "Other",
}

enum Major {
  CPSC = "Computer Science",
  CPEN = "Computer Engineering",
  MEEN = "Mechanical Engineering",
  MMET = "Manufacturing and Mechanical Engineering Technology",
  MXET = "Multidisciplinary Technology",
  ELEN = "Electrical Engineering",
  CVEN = "Civil Engineering",
  CHEN = "Chemical Engineering",
  AERO = "Aerospace Engineering",
  BMEN = "Biomedical Engineering",
  PETE = "Petroleum Engineering",
  NUEN = "Nuclear Engineering",
  OCEN = "Ocean Engineering",
  MSEN = "Materials Science and Engineering",
  IDIS = "Industrial Distribution",
  ISEN = "Industrial and Systems Engineering",
  EVEN = "Environmental Engineering",
  AREN = "Architectural Engineering",
  // add the rest later
}

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
  industriesSeeking: Industries[];
}

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>()

  useEffect(() => {
    axios.get("http://localhost:3001/api/student").then(res => setStudents(res.data))
  }, [])
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <List spacing={3}>
        {students && students.map((student) => (
          <Box p={5} shadow='md' borderWidth='1px'>
            <VStack align='stretch'>
              <Text fontSize='xl'>{student.fullname}</Text>
              <Text>UIN: {student.UIN}</Text>
              <Text>Major: {student.major}</Text>
              <Link href={student.resume} isExternal>Resume</Link>
              {student.GPA && <Text>GPA: {student.GPA}</Text>}
              {student.linkedin && <Link href={student.linkedin} isExternal>LinkedIn</Link>}
              {student.gender && <Badge>{student.gender}</Badge>}
              {student.ethnicity && <Badge>{student.ethnicity}</Badge>}
              <Text>Graduating: {student.graduationSemester} {student.graduationYear}</Text>
              {student.positionTypeSeeking.map((type, index) => (
                <Badge key={index} colorScheme='green'>{type}</Badge>
              ))}
              {student.industriesSeeking.map((industry, index) => (
                <Badge key={index} colorScheme='blue'>{industry}</Badge>
              ))}
            </VStack>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default AdminDashboard;
