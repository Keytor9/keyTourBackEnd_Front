import React, { useState } from "react";
import Navbar_Web from "../Navbar/Navbar";
import who from "../Assets/img/6754d2ee58025f5075ad5900fee15af6.png";
import story from "../Assets/img/7c4485e3a47d89c8161bcd5691c1ca8a.jpeg";
import mission from "../Assets/img/56577db3c25d5e08664c736cd9ae095e.jpeg";
import "../Assets/Css/Web.css";
import Gallery from "./Gallery";
import Partner from "./Partner";
import Footer_web from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";
import Api from "../../../services/api";
import { getSetting } from "../../../services/apiservices/webService";

function Contact() {
  const { data: Setting, isLoading, error } = useQuery("setting", getSetting);
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

    const googleMapsBaseUrl = "https://www.google.com/maps/embed?pb=";

    // Construct the dynamic part of the URL
    const mapUrl = `${googleMapsBaseUrl}!1m18!1m12!1m3!1d3455.2958974488806!2d${Setting?.address?.longitude}!3d${Setting?.address?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823e954560277%3A0x47b2b61b97a45f4c!2sAddictaCo!5e0!3m2!1sen!2seg!4v1725447682599!5m2!1sen!2seg`;
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`${Api}/api/contacts`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then((res) => {
        setFormData("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <>
      <div className="About">
        <Navbar_Web />
        <div>
          <div className="utility">
            <div className="utility-layout">
              <div className="container">
                <h1>contact Us</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis sit aliquam sit nullam.
                </p>
              </div>
            </div>
          </div>
          <div className="contact">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <h2>Let us know what you think!</h2>
                    <p>
                      Your feedback will be important as it gives us valuable
                      insights to enable continued improvement and successful
                      development. Please let us know if you have an idea,
                      recommendation, or suggestion that you would like to share
                      with us.
                    </p>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              className="form-control"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              type="number"
                              name="phone"
                              placeholder="Phone"
                              className="form-control"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={formData.email}
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Message</label>
                            <textarea
                              name="message"
                              placeholder="Message"
                              className="form-control"
                              value={formData.message}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div>
                          <button
                            className="submit-form"
                            onClick={handleSubmit}
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                  <iframe
                    src={mapUrl}
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  </div>
                  <div className="contact-links">
                    <p>
                      <i className="fa fa-map"></i>
                      {Setting?.data?.address?.title}
                    </p>
                    {Setting?.data?.phoneNumbers?.map((x, index) => (
                      <a href={`tel:${x.number}`} key={index}>
                        <i className="fa fa-phone"></i>{x.label} :{x.number}
                      </a>
                    ))}
                    <a href={`mailto:${Setting?.data?.email}`}>
                      <i className="fa fa-envelope"></i>
                      {Setting?.data?.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Partner />
          <Gallery />
        </div>
        <Footer_web />
      </div>
    </>
  );
}

export default Contact;
