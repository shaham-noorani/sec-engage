import React, { useEffect, useState } from "react";

import {
  Box,
  Text,
  Spinner,
  VStack,
  FormControl,
  Input,
  Button,
  Spacer,
  Flex,
  useToast,
  Image,
  IconButton,
  Highlight,
  Select,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUser from "../hooks/useUser";
import Company from "../types/company";
import Queue from "../types/queue";
import Major from "../types/major";

const CompanyProfilePage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();

  const { user } = useUser();

  const [company, setCompany] = useState<Company | null>(null);
  const [queues, setQueues] = useState<Queue[]>([]);

  const [newRepEmail, setNewRepEmail] = useState("");
  const [newRepName, setNewRepName] = useState("");

  const [addingRep, setAddingRep] = useState(false);
  const [addRepIsLoading, setAddRepIsLoading] = useState(false);

  const [newCompanyCode, setNewCompanyCode] = useState("");

  const [updatingCompanyCode, setUpdatingCompanyCode] = useState(false);
  const [updateCompanyCodeIsLoading, setUpdateCompanyCodeIsLoading] =
    useState(false);

  const [newQueueMajors, setNewQueueMajors] = useState<(Major | "")[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [addingNewQueue, setAddingNewQueue] = useState(false);
  const [addNewQueueIsLoading, setAddNewQueueIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    axiosPrivate.get("/company/" + user.company).then(res => {
      setCompany(res.data);
      setNewCompanyCode(res.data.companyCode);

      axiosPrivate.get("/queue/company/" + user.company).then(res => {
        setQueues(res.data);
      });
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

  const updateCompanyCode = (code: string) => {
    setUpdateCompanyCodeIsLoading(true);

    axiosPrivate
      .put("/company/" + user.company, {
        ...company,
        companyCode: code,
      })
      .then(res => {
        setCompany(prev => ({
          ...prev,
          companyCode: res.data.companyCode,
        }));
        setUpdateCompanyCodeIsLoading(false);
        setUpdatingCompanyCode(false);
      });
  };

  const addNewQueue = (majors: string[]) => {
    setAddNewQueueIsLoading(true);

    axiosPrivate
      .post("/queue/company/" + user.company, {
        companyName: company.name,
        majors: majors.filter(major => major !== ""),
      })
      .then(res => {
        setQueues(prev => [
          ...prev,
          {
            companyId: user.company,
            companyName: company.name,
            majors: majors as Major[],
            studentsInLine: [],
          },
        ]);
        setAddNewQueueIsLoading(false);
        setAddingNewQueue(false);
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

  const handleUpdateCompanyCode = () => {
    updateCompanyCode(newCompanyCode);

    toast({
      title: "Company Code Updated.",
      description: `Your company code has been updated to ${newCompanyCode}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setNewCompanyCode("");
  };

  const handleAddNewQueue = () => {
    addNewQueue(newQueueMajors);

    toast({
      title: "Queue Added.",
      description: `A new queue has been added for ${newQueueMajors
        .filter(major => major !== "")
        .join(", ")}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setNewQueueMajors([]);
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

          <Flex align={"center"}>
            <Text fontSize={"1.4rem"}>Representatives:</Text>
            {!addingRep && (
              <IconButton
                ml={2}
                color={"blue"}
                size={"sm"}
                aria-label='Add Representative'
                icon={<AddIcon />}
                onClick={() => setAddingRep(true)}
              />
            )}
          </Flex>
          {company.representatives.map(rep => (
            <Text key={rep.email}>
              {rep.fullname} - {rep.email}
            </Text>
          ))}

          {addingRep && (
            <FormControl>
              <Flex
                alignItems='center'
                gap={3}>
                <Input
                  id='newRepEmail'
                  type='text'
                  w={"10%"}
                  value={newRepEmail}
                  onChange={e => setNewRepEmail(e.target.value)}
                />
                <Input
                  id='newRepName'
                  type='text'
                  w={"10%"}
                  value={newRepName}
                  onChange={e => setNewRepName(e.target.value)}
                />
                <IconButton
                  aria-label='Add Representative'
                  color={"green"}
                  icon={<CheckIcon />}
                  isLoading={addRepIsLoading}
                  onClick={() => handleAddRep()}
                />
                <IconButton
                  aria-label='Cancel'
                  color={"red"}
                  icon={<CloseIcon />}
                  onClick={() => setAddingRep(false)}
                />
              </Flex>
            </FormControl>
          )}

          <Spacer
            mt={2}
            mb={2}
          />

          {!updatingCompanyCode && (
            <Flex align={"center"}>
              <Text fontSize={"1.4rem"}>
                Company Code:{" "}
                <Highlight
                  query={company.companyCode}
                  styles={{
                    py: "1",
                    px: "2",
                    rounded: "full",
                    bg: "blue.100",
                  }}>
                  {company.companyCode}
                </Highlight>
              </Text>
              {company.companyCode === "" ? (
                <Button
                  ml={2}
                  colorScheme='red'
                  onClick={() => setUpdatingCompanyCode(true)}>
                  Set Company Code
                </Button>
              ) : (
                <IconButton
                  ml={2}
                  color={"blue"}
                  size={"sm"}
                  aria-label='Set Company Code'
                  icon={<EditIcon />}
                  onClick={() => setUpdatingCompanyCode(true)}
                />
              )}
            </Flex>
          )}

          {updatingCompanyCode && (
            <FormControl>
              <Flex
                alignItems='center'
                gap={3}>
                <Text fontSize={"1.4rem"}>Company Code: </Text>
                <Input
                  id='companyCode'
                  type='text'
                  w={"10%"}
                  value={newCompanyCode}
                  onChange={e => setNewCompanyCode(e.target.value)}
                />
                <IconButton
                  aria-label='Update Company Code'
                  color={"green"}
                  icon={<CheckIcon />}
                  isLoading={updateCompanyCodeIsLoading}
                  onClick={() => handleUpdateCompanyCode()}
                />
                <IconButton
                  aria-label='Cancel'
                  color={"red"}
                  icon={<CloseIcon />}
                  onClick={() => setUpdatingCompanyCode(false)}
                />
              </Flex>
            </FormControl>
          )}

          <Spacer
            mt={2}
            mb={2}
          />

          <Flex align={"center"}>
            <Text fontSize={"1.4rem"}>Queues:</Text>
            {!addingNewQueue && (
              <IconButton
                ml={2}
                color={"blue"}
                size={"sm"}
                aria-label='Add Queue'
                icon={<AddIcon />}
                onClick={() => setAddingNewQueue(true)}
              />
            )}
          </Flex>

          {queues && (
            <OrderedList ml={7}>
              {queues.map(queue => (
                <ListItem key={queue.majors.join(",")}>
                  <Text fontSize={"1rem"}>{queue.majors.join(", ")}</Text>
                </ListItem>
              ))}
            </OrderedList>
          )}

          {addingNewQueue && (
            <FormControl>
              <Flex
                alignItems='center'
                gap={3}>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Select
                    key={idx}
                    placeholder={"-"}
                    onChange={e => {
                      setNewQueueMajors(prev => {
                        const newQueueMajors = [...prev];
                        newQueueMajors[idx] = e.target.value as Major | "";
                        console.log(newQueueMajors);
                        return newQueueMajors;
                      });
                    }}>
                    {Object.values(Major).map((value, idx) => (
                      <option
                        key={idx}
                        value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                ))}
                <IconButton
                  aria-label='Add Queue'
                  color={"green"}
                  icon={<CheckIcon />}
                  isLoading={addNewQueueIsLoading}
                  onClick={() => handleAddNewQueue()}
                />
                <IconButton
                  aria-label='Cancel'
                  color={"red"}
                  icon={<CloseIcon />}
                  onClick={() => setAddingNewQueue(false)}
                />
              </Flex>
            </FormControl>
          )}

          <Spacer />
        </VStack>
      </Box>
    </Box>
  );
};

export default CompanyProfilePage;
