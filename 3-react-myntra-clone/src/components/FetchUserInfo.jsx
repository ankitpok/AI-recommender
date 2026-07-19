import api from "../services/api";
import { useEffect } from "react";

const FetchUserInfo = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/api/get_user");
        console.log("User data:", response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);
  return null;
};

export default FetchUserInfo;
