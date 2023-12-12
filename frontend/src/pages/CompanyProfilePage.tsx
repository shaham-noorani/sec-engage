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
  Spacer,
  Flex,
  useToast,
  Image,
} from "@chakra-ui/react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUser from "../hooks/useUser";
import Company from "../types/company";

const CompanyProfilePage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();

  const { user } = useUser();

  const [company, setCompany] = useState<Company | null>(null);
  const [updatedCompany, setUpdatedCompany] = useState<Company | null>(null);

  const [addingRep, setAddingRep] = useState(false);

  const [addRepIsLoading, setAddRepIsLoading] = useState(false);

  const [newRepEmail, setNewRepEmail] = useState("");
  const [newRepName, setNewRepName] = useState("");

  const toast = useToast();

  useEffect(() => {
    axiosPrivate.get("/company/" + user.company).then(res => {
      setCompany(res.data);
      setUpdatedCompany(res.data);
    });
  }, []);

  const addRepresentative = (email: string, fullname: string) => {
    setAddRepIsLoading(true);

    axiosPrivate
      .post("/representative", {
        email,
        fullname,
        company: user.company,
      })
      .then(res => {
        setCompany(prev => ({
          ...prev,
          representatives: [...prev.representatives, res.data],
        }));
        setAddRepIsLoading(false);
        setAddingRep(false);
      });
  };

  const handleAddRep = () => {
    addRepresentative(newRepEmail, newRepName);

    toast({
      title: "Representative added.",
      description: `${newRepName} has been added to ${company.name}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setNewRepEmail("");
    setNewRepName("");
  };

  if (!company) {
    return <Spinner />;
  }

  return (
    <Box p={4}>
      <Box
        p={5}
        shadow='md'
        borderWidth='1px'
        key={company.name}>
        <VStack align='stretch'>
          <Flex alignItems={"center"}>
            <Text
              fontSize='xl'
              fontWeight='bold'>
              {company.name}
            </Text>
            <Image
              src={company.logo}
              alt={company.name}
              boxSize='50px'
              ml={3}
            />
          </Flex>

          <Spacer />

          <Text>Representatives:</Text>
          {company.representatives.map(rep => (
            <Text key={rep.email}>
              {rep.fullname} - {rep.email}
            </Text>
          ))}

          {addingRep && (
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                type='email'
                value={newRepEmail}
                onChange={e => setNewRepEmail(e.target.value)}
              />
              <FormLabel htmlFor='fullname'>Full Name</FormLabel>
              <Input
                id='fullname'
                type='text'
                value={newRepName}
                onChange={e => setNewRepName(e.target.value)}
              />
              <Button
                mt={4}
                colorScheme='blue'
                onClick={handleAddRep}
                isLoading={addRepIsLoading}>
                Add Representative
              </Button>

              <Button
                mt={4}
                ml={2}
                colorScheme='red'
                onClick={() => setAddingRep(false)}>
                Cancel
              </Button>
            </FormControl>
          )}
          {!addingRep && (
            <Button
              mt={4}
              onClick={() => setAddingRep(true)}>
              Add New Representative
            </Button>
          )}
        </VStack>
        <Spacer />
      </Box>
    </Box>
  );
};

export default CompanyProfilePage;
