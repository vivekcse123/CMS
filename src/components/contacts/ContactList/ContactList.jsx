import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ServiceContact";
// import Spinner from "../../Spinner/Spinner";

let ContactList = () => {
  let [query, SetQuery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    // loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: " ",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContact();
        // console.log(response.data)
        setState({
          ...state,
          contacts: response.data,
          filteredContacts: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          // loading: false,
          errorMessage: error.message,
        });
      }
    };

    fetchData(); // Call the async function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //search contact
  let searchContact = (event) => {
    SetQuery({
      ...query,
      text: event.target.value,
    });
    let theContact = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredContacts: theContact,
    });
  };

  //delete contact
  let delContact = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        console.log("contact deleted");
        let response = await ContactService.getAllContact();
        // console.log(response.data)
        setState({
          ...state,
          contacts: response.data,
          filteredContacts: response.data,
        });
      }
    } catch (error) {
      setState({
        ...state,
        // loading: false,
        errorMessage: error.message,
      });
    }
  };

  let { filteredContacts } = state;

  return (
    <>
      <section className="search-section m-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  contact Details
                  {/* <Link to={"/contact/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" /> New
                  </Link> */}
                </p>
              </div>
              <div className="col">
                <p className="fw-bold bg-light float-end rounded-2">
                  <Link to={"/cotact/list/assigntask"} className="btn">
                  AssignTask <i className="fa-solid fa-box" />
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col ">
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                  modi animi atque officiis doloremque suscipit cupiditate qui
                  saepe dolores consequuntur. Explicabo doloribus, ea eligendi
                  animi veritatis rerum porro! Saepe, soluta.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col md-6">
                <form className="row ">
                  <div className="col ">
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search names"
                        name="text"
                        value={query.text}
                        onChange={searchContact}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
        <>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 &&
                  filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={contact.photo}
                                  alt=" "
                                  className="img-fluid contact-img"
                                />
                              </div>
                              <div className="col-md-6">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:
                                    <span className="fw-bold">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile:
                                    <span className="fw-bold">
                                      {contact.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:
                                    <span className="fw-bold">
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-2 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contact/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contact/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => delContact(contact.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      }
    </>
  );
};
export default ContactList;
