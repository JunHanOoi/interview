import { Alert } from "@mui/material";
import React, {useState} from "react";

function Profile() {
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    alert("User ID is "+formData.userID+ " Password is "+formData.password)
  };

  return (
    <div className="profile" style={{ flex: "3" }}>
      <form>
        <div>
          <label style={{fontSize: "18px"}}>User ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
          <input type="text" name="userID" value={formData.userID} onChange={handleInputChange} style={{fontSize: "18px"}}/>
        </div>
        <div>
          <label style={{fontSize: "18px"}}>Password:&nbsp;</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} style={{fontSize: "18px"}}/>
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
