import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  CheckboxGroup,
  Checkbox,
  Stack,
  Spinner,
  Link,
  Badge,
  Spacer,
} from "@chakra-ui/react";

import Student from "../types/student";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUser from "../hooks/useUser";
import Major from "../types/majors";
import Industry from "src/types/industry";

export const StudentProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();

  const { user } = useUser();

  const [student, setStudent] = useState<Student | null>(null);
  const [updatedStudent, setUpdatedStudent] = useState<Student | null>(null);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axiosPrivate.get("/student/" + user.id).then(res => {
      setStudent(res.data);
      setUpdatedStudent(res.data);
    });
  }, []);

  const handleInputChange = (field: keyof Student, value: any) => {
    setUpdatedStudent(prev => ({ ...prev!, [field]: value }));
  };

  const updateStudent = () => {
    axiosPrivate.put("/student/" + user.id, updatedStudent).then(res => {
      setStudent(res.data);
      setUpdatedStudent(res.data);
      setEditMode(false);
    });
  };

  if (!student) {
    return <Spinner />;
  }

  return (
    <Box p={4}>
      {editMode && (
        <VStack
          spacing={4}
          align='stretch'>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              value={updatedStudent.email}
              isReadOnly
            />
          </FormControl>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              value={updatedStudent.fullname}
              isReadOnly
            />
          </FormControl>

          <FormControl>
            <FormLabel>UIN</FormLabel>
            <Input
              type='text'
              value={updatedStudent.UIN || ""}
              onChange={e => handleInputChange("UIN", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Major</FormLabel>
            <Select
              value={updatedStudent.major || ""}
              onChange={e =>
                handleInputChange("major", { name: e.target.value })
              }>
              options=
              {Object.values(Major).map(major => (
                <option value={major}>{major}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>GPA</FormLabel>
            <Input
              type='number'
              value={updatedStudent.GPA || ""}
              onChange={e =>
                handleInputChange("GPA", parseFloat(e.target.value))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>LinkedIn</FormLabel>
            <Input
              type='url'
              value={updatedStudent.linkedin || ""}
              onChange={e => handleInputChange("linkedin", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Resume</FormLabel>
            <Input
              type='url'
              value={updatedStudent.resume || ""}
              onChange={e => handleInputChange("resume", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              value={updatedStudent.gender || ""}
              onChange={e => handleInputChange("gender", e.target.value)}>
              <option value='M'>Male</option>
              <option value='F'>Female</option>
              <option value='O'>Other</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Ethnicity</FormLabel>
            <Select
              value={updatedStudent.ethnicity || ""}
              onChange={e => handleInputChange("ethnicity", e.target.value)}>
              <option value='White'>White</option>
              <option value='Black'>Black</option>
              <option value='Hispanic'>Hispanic</option>
              <option value='Asian'>Asian</option>
              <option value='Other'>Other</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Work Authorization</FormLabel>
            <Select
              value={updatedStudent.workAuth || ""}
              onChange={e => handleInputChange("workAuth", e.target.value)}>
              <option value='US Citizen'>US Citizen</option>
              <option value='Permanent Resident'>Permanent Resident</option>
              <option value='Seeking sponsorship'>F1 Visa</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Graduation Semester</FormLabel>
            <Select
              value={updatedStudent.graduationSemester || ""}
              onChange={e =>
                handleInputChange("graduationSemester", e.target.value)
              }>
              <option value='Fall'>Fall</option>
              <option value='Spring'>Spring</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Graduation Year</FormLabel>
            <Input
              type='number'
              value={updatedStudent.graduationYear || ""}
              onChange={e =>
                handleInputChange("graduationYear", parseInt(e.target.value))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Position Type Seeking</FormLabel>
            <Stack>
              <CheckboxGroup
                value={updatedStudent.positionTypeSeeking || []}
                onChange={value =>
                  handleInputChange("positionTypeSeeking", value)
                }>
                <Checkbox value='Internship'>Internship</Checkbox>
                <Checkbox value='Full-Time'>Full-Time</Checkbox>
                <Checkbox value='Co-Op'>Co-Op</Checkbox>
              </CheckboxGroup>
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel>Industries Seeking</FormLabel>
            <Stack>
              <CheckboxGroup
                value={updatedStudent.industriesSeeking || []}
                onChange={value =>
                  handleInputChange("industriesSeeking", value)
                }>
                {Object.values(Industry).map(industry => (
                  <Checkbox value={industry}>{industry}</Checkbox>
                ))}
              </CheckboxGroup>
            </Stack>
          </FormControl>

          <Button
            colorScheme='blue'
            onClick={updateStudent}>
            Save
          </Button>
        </VStack>
      )}

      {!editMode && (
        <Box
          p={5}
          shadow='md'
          borderWidth='1px'
          key={student.UIN}>
          <VStack align='stretch'>
            <Text fontSize='xl'>{student.fullname}</Text>
            <Text>Email: {student.email}</Text>
            <Text>UIN: {student.UIN}</Text>
            <Text>Major: {student.major}</Text>
            {student.GPA && <Text>GPA: {student.GPA}</Text>}
            <Text>
              Graduating: {student.graduationSemester} {student.graduationYear}
            </Text>

            <Spacer />

            {student.gender && <Badge>{student.gender}</Badge>}
            {student.ethnicity && <Badge>{student.ethnicity}</Badge>}
            {student.workAuth && <Badge>{student.workAuth}</Badge>}

            <Spacer />

            <Link
              href={student.resume}
              color={student.resume ? "blue.500" : "gray.500"}
              text-decoration={student.resume ? "underline" : "none"}
              isExternal>
              Resume
            </Link>
            {student.linkedin && (
              <Link
                href={student.linkedin}
                color={student.linkedin ? "blue.500" : "gray.500"}
                isExternal>
                LinkedIn
              </Link>
            )}

            <Spacer />

            <Text>Position Type(s) Seeking:</Text>
            {student.positionTypeSeeking.map((type, index) => (
              <Badge
                key={index}
                colorScheme='green'>
                {type}
              </Badge>
            ))}
            <Text mt={1}>Industry(s) Seeking:</Text>
            {student.industriesSeeking.map((industry, index) => (
              <Badge
                key={index}
                colorScheme='blue'>
                {industry}
              </Badge>
            ))}
            <Button
              mt={2}
              colorScheme='blue'
              onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default StudentProfilePage;
