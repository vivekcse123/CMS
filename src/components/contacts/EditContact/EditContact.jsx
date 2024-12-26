import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ServiceContact";
let EditContact = () => {
  let { contactId } = useParams();
  let navigate = useNavigate();
  let [state, setState] = useState({
    contact: {
      name: "",
      company: "",
      email: "",
      title: "",
      photo: "",
      mobile: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        // Use a functional update to ensure the latest state is used
        setState((prevState) => ({
          ...prevState,
          contact: response.data,
          groups: groupResponse.data,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: error.message,
        }));
      }
    };
    fetchData();
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(state.contact, contactId);
      // console.log(response.data);
      if (response) {
        navigate("/contact/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contact/edit/${contactId}`, { replace: false });
    }
  };

  let { contact, groups } = state;
  return (
    <>
      <section className="Edit-contact">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-primary fw-bold my-2"> Update Contact</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                consequuntur debitis. Vero non, esse autem iure soluta a, quasi
                blanditiis molestiae velit incidunt magnam ipsum minima expedita
                excepturi impedit necessitatibus.
              </p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <form className="">
                <div className="mb-2">
                  <input
                    type="text"
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="number"
                    required={true}
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    required={true}
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
                    required={true}
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
                    type="submit"
                    className="btn btn-primary"
                    value="Update"
                    onClick={submitForm}
                  />
                  <Link to={"/contact/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <img
                src={contact.photo}
                alt=" "
                className="img-fluid edit-img"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default EditContact;
