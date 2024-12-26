import React, { useState, useEffect } from "react";
import axios from "axios";
import { ContactService } from "../../services/ServiceContact";

const Task = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("unfinished");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Fetch user data from the JSON server
    axios
      .get("http://localhost:9000/contacts")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleUserChange = (event) => {
    const selectedUserName = event.target.value;
    setSelectedUser(selectedUserName);
    // Find the selected user's ID
    const selectedUser = users.find((user) => user.name === selectedUserName);
    if (selectedUser) {
      setSelectedUserId(selectedUser.id);
    }
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  //submit form
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      if (!selectedUser || !selectedUserId) {
        console.log("please select a user");
        return;
      }
      // task data
      const taskData = {
        contact_name: selectedUser,
        contact_Id: selectedUserId,
        task: task,
        status: status,
      };
      let response = await ContactService.createTask(taskData);
      if (response) {
        // console.log(response.data);
        setSuccessMsg("Task has been created successfully!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <form action="" className="">
            <div className="form-group row m-1">
              <label className="col-sm-4 col-form-label fw-bold">
                Select Contact:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  value={selectedUser}
                  onChange={handleUserChange}
                >
                  <option value="">Select Contact</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" form-group row m-1">
              <label className="col-sm-4 col-form-label fw-bold">
                Contact_Id:{" "}
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="text"
                  value={selectedUserId}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row m-1">
              <label className="col-sm-4 col-form-label fw-bold">Task:</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="text"
                  value={task}
                  onChange={handleTaskChange}
                />
              </div>
            </div>
            <div className="row m-1">
              <div className="col-sm-12">
                <input
                  className="form-control"
                  type="hidden"
                  value={status}
                  onChange={handleStatus}
                />
              </div>
            </div>
            <div className="row m-1">
              <div className="col-lg-12">
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-success"
                  onClick={submitForm}
                />
              </div>
            </div>
            {successMsg && (
              <div className="row m-1">
                <div className="col-lg-12">{successMsg}</div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Task;
