import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { ContactService } from "../../services/ServiceContact";


let AdminLogin = () => {
  //background img
 
  let navigate = useNavigate();
  let [state, setState] = useState({
    logindetail: { username: "", password: "" },
    errorMessage: "",
  });

  const updateInput = (event) => {
    setState({
      ...state,
      logindetail: {
        ...state.logindetail,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const { username, password } = state.logindetail;
      if (!username || !password) {
        throw new Error("Please enter both username and password.");
      }

      let adminDetails;
      let validLogin = false;
    //   let admId;

      let response = await ContactService.getLogin();
      if (response) {
        adminDetails = response.data;
        for (let i = 0; i < adminDetails.length; i++) {
          if (
            adminDetails[i].username === username &&
            adminDetails[i].password === password
          ) {
            // admId = adminDetails[i].id;
            validLogin = true;
            // console.log(admId)
            break;
          }
        }
        if (validLogin) {
          navigate("/contact/list", { replace: true });
        } else {
          throw new Error("Invalid login credentials.");
        }
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: error.message,
      }));

      // Assuming "/contact/login" should be redirected on login failure
      navigate("/contact/login", { replace: false });
    }
  };

  const { logindetail, errorMessage } = state;
  return (
    <>
      <section className="Login-form" >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <h2 className=" fw-bold text-light mt-4 py-2 text-center ">
                Welcome to Admin Login
              </h2>
              <p className="h5 text-light py-2 px-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus consectetur aliquam quibusdam ut. Aliquam magnam
                cupiditate deleniti tempora, maxime odit excepturi pariatur
                perspiciatis aut fugiat? Ipsum voluptatem molestias nulla! Vel!
              </p>
            </div>
            <div className=" login-details col-md-4 py-2">
              <div className="login-brand justify-content-center align-items-center">
                <h2 className="fw-bold text-center text-light">
                  <i className="fa-solid fa-user-large opacity-75 p-3 bg-success opacity-75 rounded-circle" />
                </h2>
              </div>
              <form className="">
                <div className="mb-2">
                  <span className="text-light">
                    <i className="fa-solid fa-user" /> AdminId
                  </span>
                  <input
                    required={true}
                    type="email"
                    name="username"
                    value={logindetail.username}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Enter username"
                  />
                </div>
                <div className="mb-2">
                  <span className="text-light">
                    <i className="fa-solid fa-key" /> Password
                  </span>
                  <input
                    required={true}
                    type="password"
                    name="password"
                    className="form-control"
                    value={logindetail.password}
                    onChange={updateInput}
                    placeholder="Enter password"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Login"
                    onClick={submitForm}
                  />
                  {/* <Link to={"/contact/signup"} className="btn btn-dark ms-2">
                    signUp
                  </Link> */}
                </div>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
