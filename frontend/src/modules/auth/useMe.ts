import axios from "axios";
import useUser from "../../hooks/useUser";

const useMe = () => {
  const { setUser }: any = useUser();

  const url = process.env.PROD ? "" : "http://localhost:3001";

  const me = async () => {
    try {
      const res = await axios.get(url + "/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      });

      let userResponse = {
        id: res.data._doc._id,
        email: res.data._doc.email,
        fullname: res.data._doc.fullname,
        role: res.data.role,
      };

      let user;
      if (res.data._doc.company) {
        user = {
          ...userResponse,
          company: res.data._doc.company,
        };
      } else {
        user = {
          ...userResponse,
        };
      }

      setUser(user);

      return user;
    } catch {
      console.error("Error getting user info (me)");
    }
  };

  return me;
};

export default useMe;
