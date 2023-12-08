import { Box, Heading, Spacer, Text } from "@chakra-ui/react";

import LoginButton from "../modules/auth/LoginButton";
import Navbar from "src/components/Navbar";

const LoginPage = () => {
  return (
    <Box
      minHeight='100vh'
      alignItems='center'
      justifyContent='center'
      display='flex'>
      <Box>
        <Heading
          mb={6}
          textAlign={"center"}>
          SEC Engage
        </Heading>
        <LoginButton />
      </Box>
    </Box>
  );
};

export default LoginPage;
