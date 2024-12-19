import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Requests from "../Assets/img/Icon (3).png";
import Tours from "../Assets/img/Icon (7).png";
import Revenue from "../Assets/img/Icon (5).png";
import Vendors from "../Assets/img/Icon (9).png";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Alert, Form } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";
import { getAllAdmins } from "../../../services/apiservices/bookingService";
import NotificationTable from "./NotificationTable";

function Vendor_Notification() {

    const [path, setPath] = useState("Admin_Admins");
    const {
      data: adminData,
      isLoading,
      error,
    } = useQuery("admin", getAllAdmins);
    const [visible, setVisible] = useState(false);
    const headerElement = (
      <div className="inline-flex align-items-center justify-content-center gap-2">
        <span className="font-bold white-space-nowrap">Add Notification</span>
      </div>
    );
    const footerContent = (
      <div className="modal-button">
        <Button
          label="Cancel"
          className="cancel"
          onClick={() => setVisible(false)}
          autoFocus
        />
        <Button
          label="Send Now"
          type="submit"
          onClick={() => {
            handleSubmit();
            setVisible(false)
            // setVisible(false);
          }}
          className="save"
          autoFocus
        />
        <Button
          label="Schedule"
          type="submit"
          onClick={() => {
            handleSubmit();
            setVisible(false)
            // setVisible(false);
          }}
          className="save"
          autoFocus
        />
      </div>
    );
  
    
  
    const [formData, setFormData] = useState({
      title: "",
      massage: "",
      date: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    
  
    const handleSubmit = async (e) => {
      // e.preventDefault();
      const response = await axios
        .post("http://185.170.198.81/api/admin", formData, {
          headers: {
            // Authorization: "Bearer " + auth.token,
            role: "admin"
          },
        })
        .then((res) => {
          // getData();
        })
        .catch((error) => {
          // setError(error.response.data.title)
        });
    };
  
  


  return (
    <>
      <div className="main">
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="dev-table">
            <Navbar />
            <div className="table-card mt-4">
                <h1>Notification</h1>
              <div className="table-top">
                <a className="add" onClick={() => setVisible(true)}><i className="fa fa-plus"></i></a>
              </div>
              <NotificationTable path={path} dataToDisplay={adminData?.data} />
              <Dialog
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: "50rem" }}
                onHide={() => {
                  if (!visible) return;
                  setVisible(false);
                }} 
              >
                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* <h1 className="error-text">{error}</h1> */}
                    <div className="col-md-6">
                      <Form.Group className="form-group">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          placeholder=""
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="form-group">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          type="text"
                          name="message"
                          placeholder=""
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="form-group">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          placeholder=""
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </Form>
              </Dialog>
            </div>
        </div>
    </div>
    </>
  );
}

export default Vendor_Notification;
