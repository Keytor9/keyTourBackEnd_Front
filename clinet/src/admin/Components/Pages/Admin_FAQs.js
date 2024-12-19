import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import React, { useState, useEffect } from "react";
import "../Assets/Css/Table.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Alert, Form } from "react-bootstrap";
import { useQuery } from "react-query";
import { getAllFAQs } from "../../../services/apiservices/bookingService";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function FAQs() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    
    const {
        data: FAQs,
        isLoading,
        error,
    } = useQuery("FAQs", getAllFAQs);

    // console.log(FAQs);
    
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const headerElement2 = (
        <div className="d-flex align-items-center justify-content-between gap-2">
        <span className="font-bold white-space-nowrap">Edit FAQ</span>
        </div>
    );
    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
        <span className="font-bold white-space-nowrap">Add FAQ</span>
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
            label="Save"
            type="submit"
            onClick={() => {
            handleSubmit();
            {!error ? setVisible(true) : setVisible(false)}
            }}
            className="save"
            autoFocus
        />
        </div>
    );
    const footerContent2 = (
        <div className="modal-button">
        <Button
            label="Cancel"
            className="cancel"
            onClick={() => setVisible2(false)}
            autoFocus
        />
        <Button
            label="Save"
            type="submit"
            onClick={() => {
            editUser();
            setVisible2(false);
            }}
            className="save"
            autoFocus
        />
        </div>
    );

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
    });

    

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const response = await axios
      .post("http://185.170.198.81/api/faqs", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // getData();
      })
      .catch((error) => {
        // setError(error.response.data.title)
      });
  };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    

  const deleteUser = async (_id) => {
    // wait for 1 second before deleting
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios
      .delete("http://185.170.198.81/api/faqs/" + _id, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // getData();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const editUser = async (id) => {
    const response = await axios
      .patch(`http://185.170.198.81/api/faqs/` + formData?._id, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // getData();
        setVisible(false)
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const sanitizeId = (str) => str.replace(/[^a-zA-Z0-9-_]/g, '-');


  return (
    <>
          <div className="table">
            <div>
                <a className="add d-flex justify-content-end" onClick={() => setVisible(true)}>
                    <i className="fa fa-plus mt-4"></i>
                </a>
            </div>
            <div class="accordion" id="accordionExample">
            {FAQs?.map((x, index) => {
  const sanitizedId = sanitizeId(x.question); // Sanitize the question to generate a valid ID
  return (
    <div className="accordion-item" key={index}>
      <h2 className="accordion-header" id={x._id}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${sanitizedId}`}
          aria-expanded="true"
          aria-controls={sanitizedId}
        >
          {x.question}
          <div className="action-table d-flex justify-content-end">
            <a
              className="edit"
              onClick={() => {
                setVisible2(true);
                setFormData(x);
              }}
            >
              <i className="fa fa-pen"></i>
            </a>
            <a
              className="delete"
              onClick={() => {
                deleteUser(x._id);
              }}
            >
              <i className="fa fa-trash"></i>
            </a>
          </div>
        </button>
      </h2>
      <div
        id={sanitizedId}
        className="accordion-collapse collapse show"
        aria-labelledby={x._id}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          {x.answer}
        </div>
      </div>
    </div>
  );
})}

            </div>
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
                <h1 className="error-text">{error}</h1>
                  <div className="col-md-6">
                    <Form.Group className="form-group">
                      <Form.Label>Question</Form.Label>
                      <Form.Control
                        type="text"
                        name="question"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="form-group">
                      <Form.Label>Answer</Form.Label>
                      <Form.Control
                        type="text"
                        name="answer"
                        placeholder=""
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Dialog>
            <Dialog
              visible={visible2}
              modal
              header={headerElement2}
              footer={footerContent2}
              style={{ width: "50rem" }}
              onHide={() => {
                if (!visible2) return;
                setVisible2(false);
              }}
            >
              <Form onSubmit={editUser}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="form-group">
                      <Form.Label>Question</Form.Label>
                      <Form.Control
                        type="text"
                        name="question"
                        placeholder=""
                        value={formData.question}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="form-group">
                      <Form.Label>Answer</Form.Label>
                      <Form.Control
                        type="text"
                        name="answer"
                        value={formData.answer}
                        placeholder=""
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Dialog>
          </div>
    </>
  );
}

export default FAQs;
