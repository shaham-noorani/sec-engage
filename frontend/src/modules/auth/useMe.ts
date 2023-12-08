import axios from "axios";
import useUser from "../../hooks/useUser";

const useMe = () => {
  const { setUser }: any = useUser();

  const url = process.env.PROD ? "" : "http://localhost:3001";

  const me = async () => {
    console.log(localStorage.getItem("idToken"), "idToken");
    const res = await axios.get(url + "/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    });
    try {
      setUser({
        id: res.data._doc._id,
        email: res.data._doc.email,
        fullname: res.data._doc.fullname,
        role: res.data.role,
      });
    } catch {
      console.error("Error getting user info (me)");
    }
  };

  return me;
};

export default useMe;
