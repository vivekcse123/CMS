import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import ContactList from "./components/contacts/ContactList/ContactList";
import AddContact from "./components/contacts/AddContact/AddContact";
import ViewContact from "./components/contacts/ViewContact/ViewContact";
import EditContact from "./components/contacts/EditContact/EditContact";
import Login from "./components/Login/Login";
import UserLogin from "./components/Login/UserLogin";
import AdminLogin from "./components/Login/AdminLogin";
import Task from "./components/Task/Task";
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/contact/login"} />} />
        <Route path={"/contact/login"} element={<Login />} />
        <Route path={"/contact/userlogin"} element={<UserLogin />} />
        <Route path={"/contact/adminlogin"} element={<AdminLogin />} />
        <Route path={"/contact/list"} element={<ContactList />} />
        <Route path={"/contact/add"} element={<AddContact />} />
        <Route path={"/cotact/list/assigntask"} element={<Task />} />
        <Route path={"/contact/view/:contactId"} element={<ViewContact />} />
        <Route path={"/contact/edit/:contactId"} element={<EditContact />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
