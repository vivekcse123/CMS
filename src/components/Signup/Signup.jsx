import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactService } from "../../services/ServiceContact";
import banner from "../../assets/img/banner.jpg";
const Signup = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
    height:"100vh",
    margin: "auto",
    display: "block",
  };

  const navigate = useNavigate();

  const [state, setState] = useState({
    details: {
      username: "",
      password: "",
      cnfpassword: "",
    },
    errorMessage: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      details: { ...state.details, [event.target.name]: event.target.value },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const { username, password, cnfpassword } = state.details;

      if (!username || !password) {
        throw new Error("Please enter the details for registration!");
      }
      if (password !== cnfpassword) {
        throw new Error("Password should be matched!");
      }

      let response = await ContactService.createLogin(state.details);
      if (response) {
        navigate("/contact/login", { replace: true });
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: error.message,
      }));
      navigate("/contact/signup", { replace: false });
    }
  };

  let { details, errorMessage } = state;

  return (
    <section className="signup">
      <div
        className="signup-container container-fluid"
        style={backgroundImageStyle}
      >
        <div className="row">
          <div className="col-md-8">
          <p className="h3 display-flex position-relative text-light">Contact Managment System</p>
          </div>

          <div className="signup-col col-md-4 bg-dark mt-5  opacity-50 rounded-2">
            <div className="signup-brand">
              <div className="signup justify-content-center align-items-center mt-4">
                <h2 className="fw-bold text-center text-light">
                  <i className="fa fa-sign-in m-2 p-3 bg-primary opacity-75 rounded-circle" />
                </h2>
              </div>
            </div>
            <form className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-light">
                  <i className="fa-solid fa-user" /> Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  value={details.username}
                  onChange={updateInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-light">
                  <i className="fa-solid fa-lock" /> Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={details.password}
                  onChange={updateInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cnfpassword" className="form-label text-light">
                  <i className="fa-solid fa-lock" /> Confirm Password
                </label>
                <input
                  type="password"
                  name="cnfpassword"
                  className="form-control"
                  id="cnfpassword"
                  placeholder="Retype password"
                  value={details.cnfpassword}
                  onChange={updateInput}
                  required
                />
              </div>
              <div className="mb-3 text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={submitForm}
                >
                  Sign Up
                </button>
              </div>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
