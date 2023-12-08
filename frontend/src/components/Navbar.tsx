import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/react";
import useUser from "../hooks/useUser";

function Navbar() {
  const { user }: any = useUser();
  const navigate = useNavigate();

  const showStudentLinks = user.role === "student" || user.role === "admin";
  const showRepresentativeLinks =
    user.role === "representative" || user.role === "admin";

  const linkStyle = {
    marginRight: 4,
    border: "1px solid black",
    padding: "1rem",
    borderRadius: "5px",
  };

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      p={4}>
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
          style={{ marginRight: 4 }}
          fontSize='xl'
          fontWeight='bold'>
          SEC Engage
        </Text>
      </Box>
      <Box>
        {showStudentLinks && (
          <>
            <Link
              to='/student'
              style={linkStyle}>
              Dashboard
            </Link>
            <Link
              to='/student/profile'
              style={linkStyle}>
              Profile
            </Link>
            <Link
              to='/student/check-in-out'
              style={linkStyle}>
              Check In/Out
            </Link>
            <Link
              to='/student/interactions'
              style={linkStyle}>
              Interactions
            </Link>
          </>
        )}
        {showRepresentativeLinks && (
          <Link
            to='/representative/profile'
            style={linkStyle}>
            Profile
          </Link>
        )}
        {user.role === "admin" && (
          <Link
            to='/admin/analytics'
            style={linkStyle}>
            Analytics
          </Link>
        )}
        <Link
          onClick={() => {
            localStorage.removeItem("idToken");
            localStorage.removeItem("refreshToken");
          }}
          to={"/login"}
          style={linkStyle}>
          Logout
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
