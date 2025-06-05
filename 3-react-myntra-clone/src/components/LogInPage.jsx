import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const success = await login(formData.username, formData.password);
    if (success) {
      navigate("/", { replace: true });
    } else {
      setError("Invalid credentials");
    }
  } catch (error) {
    setError("Login failed. Please try again.");
    console.error("Full error:", {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
  }
};

  return (
    <div>
      <input 
        type="text" 
        name="username" 
        value={formData.username} 
        onChange={handleOnChange} 
        placeholder="Enter username" 
      />
      <input 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleOnChange} 
        placeholder="Enter Password" 
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Login;