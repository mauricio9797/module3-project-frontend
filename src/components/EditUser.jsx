import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const {  user } = useContext(AuthContext);
  const { userId } = useParams();
  console.log(userId, "userId")
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  //const [userImage, setUserImage] = useState("");
  //const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    try {
      const gotToken = localStorage.getItem("authToken");

     axios
          .get(`http://localhost:5005/auth/editUser/${userId}`,{
            headers: { authorization: `Bearer ${gotToken}` },
          })
          .then((response) => {
            console.log("response.data from frontend", response.data);
            const { email } = response.data;
            console.log(email);
            setEmail(response.email);
          })
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch user data. Please try again.");
    }
     
  }, [userId]);

   

   const handleEditUser = (e) => {
     e.preventDefault();
   
    const userToEdit = { email };

    try {
      const gotToken = localStorage.getItem("authToken");
      axios
        .put(`http://localhost:5005/auth/editUser/${userId}`, userToEdit, {
          headers: { authorization: `Bearer ${gotToken}` },
        })
        .then(() => {
          navigate("/profile");
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("There was an error editing the user. Please try again.");
        });
    } catch (error) {
      console.log(error);
      setErrorMessage("There was an error editing the user. Please try again.");
    }
  };

  return (
    <div className="EditUserPage">
      <h1>Edit User</h1>

      <form onSubmit={handleEditUser} encType="multipart/form-data">
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        

        <button type="submit">Save Changes</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Link to={"/profile"}>
        <button>Back to Profile</button>
      </Link> 
    </div>
  );
//}
}

export default EditUser
