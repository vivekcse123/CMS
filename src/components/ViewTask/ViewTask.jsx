import React, { useEffect, useState } from "react";
import { ContactService } from "../../services/ServiceContact";

function ViewTask({ contactId }) {
  const [state, setState] = useState({
    tasks: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ContactService.getTask();
        const filteredTasks = response.data.filter(
          (task) => task.contact_Id === parseInt(contactId)
        );
        setState((prevState) => ({
          ...prevState,
          tasks: filteredTasks, // Update the tasks state here
        }));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, [contactId]);
  let { tasks } = state;

  return (
    <>
      {tasks.length > 0 && (
        <section className="tasks-section">
          <div className="container">
            <div className="row align-item-center">
              <p className="h2 m-2 fw-bold text-center">Tasks</p>
              <div className="col md-4">
                <table className="table table-striped table-bordered table-sm">
                  <thead className="thead-dark text-center">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Work-Assign</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {tasks.map((task, index) => (
                      <tr key={index}>
                        <td className="m-2">{task.id}</td>
                        <td className="m-2">{task.contact_name}</td>
                        <td className="m-2">{task.task}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ViewTask;
