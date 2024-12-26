import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ServiceContact";

const AddContact = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    contact: {
      name: "",
      email: "",
      password: "",
      cnfpassword: "",
      company: "",
      title: "",
      photo: "",
      mobile: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ContactService.getGroups();
        setState((prevState) => ({
          ...prevState,
          groups: response.data,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: error.message,
        }));
      }
    };
    fetchData();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const { email, password, cnfpassword } = state.contact;
      if (!email || !password) {
        throw new Error("Please Enter the details for the registration!");
      }
      if (password !== cnfpassword) {
        throw new Error("Password and cnfPassword should be matched!");
      }

      const response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contact/userlogin", { replace: true });
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: error.message,
      }));
      navigate("/contact/add", { replace: false });
    }
  };

  const { contact, groups, errorMessage } = state;

  return (
    <>
      {/* {console.log(contact)} */}
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      <section className="create-contact">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold my-2"> Create Contact</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                consequuntur debitis. Vero non, esse autem iure soluta a, quasi
                blanditiis molestiae velit incidunt magnam ipsum minima expedita
                excepturi impedit necessitatibus.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form className="">
                <div className="mb-2">
                  <input
                    required={true}
                    type="text"
                    name="name"
                    className="form-control"
                    value={contact.name}
                    onChange={updateInput}
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="email"
                    value={contact.email}
                    onChange={updateInput}
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="number"
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select
                    required={true}
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                    className="form-control"
                  >
                    <option value="">Select a group</option>
                    {groups.length > 0 &&
                      groups.map((group) => {
                        return (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="password"
                    value={contact.password}
                    onChange={updateInput}
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    name="cnfpassword"
                    className="form-control"
                    placeholder="Retype password"
                    value={contact.cnfpassword}
                    onChange={updateInput}
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                    onClick={submitForm}
                  />
                  <Link to={"/contact/userlogin"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
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
export default AddContact;
