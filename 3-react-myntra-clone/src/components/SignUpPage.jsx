import axios from "axios";
import { useState } from "react";

const Signup = () => {
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleOnChange = (e) =>{
    setFormData({...formData, [e.target.name] : [e.target.value]})
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", JSON.stringify(formData), {
        headers: {"Content-Type":"application/json"},

      });
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (<>
  <input type="text" name="username" value={ formData.username} onChange={handleOnChange} placeholder="Enter username"></input><br></br>
  <input type="password" name="password" value={formData.password} onChange={handleOnChange} placeholder="Enter Password"></input><br></br>
  <button type="button" className="btn btn-dark" onClick={handleSubmit}>Submit</button>
</>
  )
}
export default Signup;