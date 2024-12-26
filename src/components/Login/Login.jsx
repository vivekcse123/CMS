// components/Login.js
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import banner from "../../assets/img/banner.jpg";

const Login = ({ setUserType }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };

  // const navigate = useNavigate();
  const [userType, setUserTypeLocal] = useState("");
  // const [userId, setUserId] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   // You may want to perform authentication logic here
  //   // console.log(`User Type: ${userType}, ID: ${userId}, Password: ${password}`);
  //   navigate("/contact/list");
  // };

  const renderUserTypeSpecificFields = () => {
    if (userType === "user") {
      return (
        <>
          <UserLogin />
        </>
      );
    } else if (userType === "admin") {
      return (
        <>
          <AdminLogin />
        </>
      );
    }
    return null;
  };

  return (
    <div className="container-fluid " style={backgroundImageStyle}>
      <div className="row" >
        <div className="col-md-12 bg-dark opacity-75">
          <form className="">
            <div className="p-2 display-flex position-relative">
              <select
                value={userType}
                onChange={(e) => setUserTypeLocal(e.target.value)}
                className="form-control form-select-sm bg-dark opacity-75 text-light"
                style={{width:"30%"}}
              >
                <option value="">Login Type</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            {renderUserTypeSpecificFields()}
            {/* <button onClick={handleLogin}>Login</button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
