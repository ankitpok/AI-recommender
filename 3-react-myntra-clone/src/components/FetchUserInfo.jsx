import axios from "axios";
import { useEffect } from "react";

const FetchUserInfo = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get_user", {
          withCredentials: true,  // Include credentials in the request
        });
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