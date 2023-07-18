import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Layout from "./Layout";

function ProfilePage() {
  const { logOutUser, user } = useContext(AuthContext);
  console.log(user);

  return (
    <Layout>
    <div>
      {user && user.email}
      ProfilePage
      <button onClick={logOutUser}>Logout</button>
    </div>
    </Layout>
  );
}

export default ProfilePage;