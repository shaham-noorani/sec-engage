import React, { useEffect, useState } from "react";

import {
  Box,
  Text,
  Spinner,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Spacer,
} from "@chakra-ui/react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUser from "../hooks/useUser";
import Representative from "../types/representative";
import Company from "../types/company";

const RepresentativeProfilePage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();

  const { user } = useUser();

  const [company, setCompany] = useState<Company | null>(null);
  const [representative, setRepresentative] = useState<Representative | null>(
    null
  );
  const [updatedRepresentative, setUpdatedRepresentative] =
    useState<Representative | null>(null);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axiosPrivate.get("/representative/" + user.id).then(res => {
      setRepresentative(res.data);
      setUpdatedRepresentative(res.data);
      axiosPrivate.get("/company/" + res.data.company).then(res => {
        setCompany(res.data);
      });
    });
  }, []);

  const handleInputChange = (field: keyof Representative, value: any) => {
    setUpdatedRepresentative(prev => ({ ...prev!, [field]: value }));
  };

  const updateRepresentative = () => {
    axiosPrivate
      .put("/representative/" + user.id, updatedRepresentative)
      .then(res => {
        setRepresentative(res.data);
        setUpdatedRepresentative(res.data);
        setEditMode(false);
      });
  };

  if (!representative) {
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
              value={updatedRepresentative.email}
              isReadOnly
            />
          </FormControl>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              value={updatedRepresentative.fullname}
              isReadOnly
            />
          </FormControl>

          <FormControl>
            <FormLabel>Company</FormLabel>
            <Input
              type='text'
              value={company?.name}
              isReadOnly
            />
          </FormControl>

          <FormControl>
            <FormLabel>Position</FormLabel>
            <Input
              type='text'
              value={updatedRepresentative.position || ""}
              onChange={e => handleInputChange("position", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>LinkedIn</FormLabel>
            <Input
              type='url'
              value={updatedRepresentative.linkedin || ""}
              onChange={e => handleInputChange("linkedin", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type='tel'
              value={updatedRepresentative.phone || ""}
              onChange={e => handleInputChange("phone", e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme='blue'
            onClick={updateRepresentative}>
            Save
          </Button>
        </VStack>
      )}

      {!editMode && (
        <Box
          p={5}
          shadow='md'
          borderWidth='1px'
          key={representative.email}>
          <VStack align='stretch'>
            <Text fontSize='xl'>{representative.fullname}</Text>
            <Text>Email: {representative.email}</Text>
            <Text>Company: {company?.name}</Text>
            <Text>Position: {representative.position}</Text>
            <Text>Phone: {representative.phone}</Text>

            <Spacer />

            {representative.linkedin && (
              <Link
                href={representative.linkedin}
                color={representative.linkedin ? "blue.500" : "gray.500"}
                textDecoration={representative.linkedin ? "underline" : "none"}
                isExternal>
                LinkedIn
              </Link>
            )}

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

export default RepresentativeProfilePage;
