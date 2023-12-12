import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();

  const url = process.env.PROD ? "" : "http://localhost:3001";

  const refresh = async () => {
    const res = await axios.post(url + "/auth/google/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    setAuth({
      refreshToken: res.data.refresh_token,
      idToken: res.data.id_token,
    });

    localStorage.setItem("refreshToken", res.data.refresh_token);
    localStorage.setItem("idToken", res.data.id_token);

    return res.data.id_token;
  };

  return refresh;
};

export default useRefreshToken;
