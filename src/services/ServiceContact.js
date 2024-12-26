import axios from "axios";

export class ContactService {
  static serverUrl = "http://localhost:9000";

  //get the groups
  static getGroups() {
    let dataUrl = `${this.serverUrl}/groups`;
    return axios.get(dataUrl);
  }

  //get single group
  static getGroup(contact) {
    let groupId = contact.groupId;
    let dataUrl = `${this.serverUrl}/groups/${groupId}`;
    return axios.get(dataUrl);
  }

  //get the all contact
  static getAllContact() {
    let dataUrl = `${this.serverUrl}/contacts`;
    return axios.get(dataUrl);
  }

  //get the data with Id
  static getContact(contactId) {
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return axios.get(dataUrl);
  }

  //create contact
  static createContact(contact) {
    let dataUrl = `${this.serverUrl}/contacts`;
    return axios.post(dataUrl, contact);
  }

  //gettask
  static getTask() {
    let dataUrl = `${this.serverUrl}/tasks`;
    return axios.get(dataUrl);
  }

  //create task
  static createTask(task) {
    let dataUrl = `${this.serverUrl}/tasks`;
    return axios.post(dataUrl, task);
  }

  //
  static updateTask(taskID) {
    let dataUrl = `${this.serverUrl}/tasks/${taskID}`;
    return axios.put(dataUrl);
  }

  //update data
  static updateContact(contact, contactId) {
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return axios.put(dataUrl, contact);
  }

  //delete contact
  static deleteContact(contactId) {
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return axios.delete(dataUrl);
  }

  //post the login details
  // static createLogin(username, password) {
  //   let dataUrl = `${this.serverUrl}/admins/${username}/${password}`;
  //   return axios.post(dataUrl);
  // }

  //get login details
  static getLogin() {
    let dataUrl = `${this.serverUrl}/admins`;
    return axios.get(dataUrl);
  }

  //post login details
  static createLogin(admin) {
    let dataUrl = `${this.serverUrl}/admins`;
    return axios.post(dataUrl, admin);
  }
}
