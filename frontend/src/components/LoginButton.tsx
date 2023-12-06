import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";

const LoginButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post("http://localhost:3001/auth/google", {
        code,
      });

      localStorage.setItem("google_id_token", tokens.data.id_token);
      localStorage.setItem("google_access_token", tokens.data.access_token);
      localStorage.setItem("google_refresh_token", tokens.data.refresh_token);

      window.location.reload();
    },
    flow: "auth-code",
  });

  return <Button onClick={() => googleLogin()}>Login with Google</Button>;
};

export default LoginButton;
