import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../services/ServiceContact";
let UserLogin = () => {
  let [state, setState] = useState({
    userlogin: { username: "", password: "" },
    errorMessage: "",
  });
  let navigate = useNavigate();
  const updateInput = (event) => {
    setState({
      ...state,
      userlogin: {
        ...state.userlogin,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const { username, password } = state.userlogin;
      if (!username || !password) {
        throw new Error("Please enter both username and password.");
      }

      let userDetails;
      let validlogin = false;
      let userId;

      let response = await ContactService.getAllContact();
      if (response) {
        userDetails = response.data;
        // console.log(userDetails)
        for (let i = 0; i < userDetails.length; i++) {
          if (
            userDetails[i].email === username &&
            userDetails[i].password === password
          ) {
            userId = userDetails[i].id;
            // console.log(userId);
            validlogin = true
            break
          }
        }
        if(validlogin){
          navigate("/contact/view/" + userId, {replace: true})
        }
        else {
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

  const { userlogin } = state;
  return (
    <>
      <section className="user-login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <h2 className=" fw-bold text-light mt-4 py-2 text-center ">
                Welcome to User Login
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
                    <i className="fa-solid fa-user" /> UserId
                  </span>
                  <input
                    required={true}
                    type="email"
                    name="username"
                    value={userlogin.username}
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
                    value={userlogin.password}
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
                  <Link to={"/contact/add"} className="btn btn-dark ms-2">
                    signUp
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default UserLogin;
