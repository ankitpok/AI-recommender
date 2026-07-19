import api from "../services/api";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/signup/", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleOnChange}
        placeholder="Enter username"
      />
      <br />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleOnChange}
        placeholder="Enter Password"
      />
      <br />
      <button type="button" className="btn btn-dark" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};
export default Signup;
