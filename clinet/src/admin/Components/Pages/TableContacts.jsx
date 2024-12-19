
// TableContacts.js
import React from "react";
import "../Assets/Css/Table.css";
import { useNavigate } from "react-router-dom";

function TableContacts({ path, dataToDisplay }) {
  const navigate = useNavigate();

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.map((contact, index) => (
            <tr key={index} onClick={() => navigate(`/${path}/${contact._id}`)}>
              <td>{contact._id}</td>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableContacts;
