import React, { useEffect, useState } from "react";

import {
  Box,
  List,
  Link,
  Badge,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import Student from "../types/students";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const TestComponent: React.FC = () => {
  const [students, setStudents] = useState<Student[]>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("http://localhost:3001/api/student")
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={4}>
      <Heading>TestComponent</Heading>
      <List spacing={3}>
        {students &&
          students.map(student => (
            <Box
              p={5}
              shadow='md'
              borderWidth='1px'
              key={student.UIN}>
              <VStack align='stretch'>
                <Text fontSize='xl'>{student.fullname}</Text>
                <Text>UIN: {student.UIN}</Text>
                <Text>Major: {student.major}</Text>
                <Link
                  href={student.resume}
                  isExternal>
                  Resume
                </Link>
                {student.GPA && <Text>GPA: {student.GPA}</Text>}
                {student.linkedin && (
                  <Link
                    href={student.linkedin}
                    isExternal>
                    LinkedIn
                  </Link>
                )}
                {student.gender && <Badge>{student.gender}</Badge>}
                {student.ethnicity && <Badge>{student.ethnicity}</Badge>}
                <Text>
                  Graduating: {student.graduationSemester}{" "}
                  {student.graduationYear}
                </Text>
                {student.positionTypeSeeking.map((type, index) => (
                  <Badge
                    key={index}
                    colorScheme='green'>
                    {type}
                  </Badge>
                ))}
                {student.industriesSeeking.map((industry, index) => (
                  <Badge
                    key={index}
                    colorScheme='blue'>
                    {industry}
                  </Badge>
                ))}
              </VStack>
            </Box>
          ))}
      </List>
    </Box>
  );
};

export default TestComponent;
