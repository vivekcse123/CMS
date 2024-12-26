import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactService } from "../../../services/ServiceContact";
import ViewTask from "../../ViewTask/ViewTask";

const ViewContact = () => {
  const { contactId } = useParams();

  const [state, setState] = useState({
    contact: {},
    errorMessage: "",
    group: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroup(response.data);

        setState((prevState) => ({
          ...prevState,
          contact: response.data,
          group: groupResponse.data,
        }));
        // console.log('Contact:', response.data);
        // console.log('Tasks:', filteredTasks);
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: error.message,
        }));
      }
    };
    fetchData();
  }, [contactId]);

  const { contact, group } = state;
  // console.log("Contact:", contact);
  // console.log("Tasks:", tasks);
  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">View Contact</p>
              <p className="">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus consectetur aliquam quibusdam ut. Aliquam magnam
                cupiditate deleniti tempora, maxime odit excepturi pariatur
                perspiciatis aut fugiat? Ipsum voluptatem molestias nulla! Vel!
              </p>
            </div>
          </div>
        </div>
      </section>

      {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
        <section className="view-contact">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <img
                  src={contact.photo}
                  alt=""
                  className="img-fluid view-img"
                />
              </div>
              <div className="col-md-8">
                <ul className="list-group">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                      Name: <span className="fw-bold">{contact.name}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Mobile:
                      <span className="fw-bold">{contact.mobile}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Email: <span className="fw-bold">{contact.email}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Company:
                      <span className="fw-bold">{contact.company}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Title: <span className="fw-bold">{contact.title}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Group: <span className="fw-bold">{group.name}</span>
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
            {/* <div className="row">
              <div className="col">
                <Link to={backLink} className="btn btn-warning">
                  <i className="fa fa-arrow-left" /> Back
                </Link>
              </div>
            </div> */}
          </div>
        </section>
      )}
      <ViewTask contactId={contactId} />
    </>
  );
};

export default ViewContact;
