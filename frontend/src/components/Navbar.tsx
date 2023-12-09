import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Text, Link } from "@chakra-ui/react";
import useUser from "../hooks/useUser";

function Navbar() {
  const { user }: any = useUser();
  const navigate = useNavigate();

  const showStudentLinks = user.role === "student" || user.role === "admin";
  const showRepresentativeLinks = user.role === "representative";

  const studentLinks = [
    {
      name: "Dashboard",
      link: "/student",
    },
    {
      name: "Profile",
      link: "/student/profile",
    },
    {
      name: "Check In/Out",
      link: "/student/check-in-out",
    },
    {
      name: "Interactions",
      link: "/student/interactions",
    },
  ];

  const representativeLinks = [
    {
      name: "Your Profile",
      link: "/representative/profile",
    },
    {
      name: "Your Interactions",
      link: "/representative/interactions",
    },
    {
      name: "Company Profile",
      link: "/representative/company/profile",
    },
    {
      name: "Company Interactions",
      link: "/representative/company/interactions",
    },
  ];

  const adminLinks = [
    {
      name: "Analytics",
      link: "/admin/analytics",
    },
  ];

  const linksToShow = [
    ...(showStudentLinks ? studentLinks : []),
    ...(showRepresentativeLinks ? representativeLinks : []),
    ...(user.role === "admin" ? adminLinks : []),
  ];

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      p={4}
      bg='gray.100'>
      <Box>
        <Text
          onClick={() => {
            navigate(
              user.role === "student"
                ? "/student"
                : user.role === "representative"
                ? "/representative/profile"
                : "/admin/analytics"
            );
          }}
          fontSize='xl'
          fontWeight='bold'>
          SEC Engage
        </Text>
      </Box>
      <Box>
        {linksToShow.map(link => (
          <Link
            color={
              window.location.pathname === link.link ? "blue.500" : "black"
            }
            mr={4}
            _hover={{ textDecoration: "none", color: "gray" }}
            key={link.name}
            onClick={() => {
              navigate(link.link);
            }}>
            {link.name}
          </Link>
        ))}
        <Link
          onClick={() => {
            localStorage.removeItem("idToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
          }}
          mr={4}
          ml={10}
          _hover={{ textDecoration: "none", color: "red" }}>
          Logout
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
