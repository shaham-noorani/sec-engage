import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      p={4}>
      <Box>
        <Text
          fontSize='xl'
          fontWeight='bold'>
          My App
        </Text>
      </Box>
      <Box>
        <Link
          to='/admin'
          style={{ marginRight: 4 }}>
          Admin
        </Link>
        <Link
          to='/company'
          style={{ marginRight: 4 }}>
          Company
        </Link>
        <Link
          to='/representative'
          style={{ marginRight: 4 }}>
          Representative
        </Link>
        <Link
          to='/student'
          style={{ marginRight: 4 }}>
          Student
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
