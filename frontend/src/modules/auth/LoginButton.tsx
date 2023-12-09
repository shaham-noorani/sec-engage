import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import useAuth from "./useAuth";
import useMe from "./useMe";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";
import styled, { keyframes } from "styled-components";

const rainbowAnimation = keyframes`
  0% { background-color: red; }
  14% { background-color: orange; }
  28% { background-color: yellow; }
  42% { background-color: green; }
  57% { background-color: blue; }
  71% { background-color: indigo; }
  85% { background-color: violet; }
  100% { background-color: red; }
`;

const RainbowButton = styled(Button)`
  animation: ${rainbowAnimation} 5s linear infinite;
  color: white;
`;

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth }: any = useAuth();

  const me = useMe();
  const navigate = useNavigate();
  const location = useLocation();

  const url = process.env.PROD ? "" : "http://localhost:3001";

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }: any) => {
      setIsLoading(true);
      const tokens = await axios.post(url + "/auth/google", {
        code,
      });
      const refreshToken = tokens.data.refresh_token;
      const idToken = tokens.data.id_token;

      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("idToken", idToken);

      setAuth({
        idToken: idToken,
        refreshToken: refreshToken,
      });

      const user = await me();
      setIsLoading(false);

      const to = {
        pathname:
          user.role === "student"
            ? "/student/profile"
            : user.role === "representative"
            ? "/representative/profile"
            : "/admin/analytics",
      };

      navigate(to, { replace: true });
    },
    flow: "auth-code",
  });

  return (
    <RainbowButton
      onClick={googleLogin}
      isLoading={isLoading}
      size={"lg"}>
      Sign In with Google SSO
    </RainbowButton>
  );
};

export default LoginButton;
