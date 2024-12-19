import React from "react";
import { Link } from "react-router-dom";
import "../Assets/Css/Footer.css"
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";
import Api from "../../../services/api";
import { getSetting } from "../../../services/apiservices/webService";

function Footer_web() {
  const { data: Setting, isLoading, error } = useQuery("setting", getSetting);
  console.log(Setting);
  return (
    <>
      <div className="footer footer-web">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div>
                <h2>Tours store</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Pharetra nibh a
                  malesuada pellentesque lectus tincidunt nisl fames interdum
                </p>
                  <ul className="social">
                    <li>
                      <a href={Setting?.data?.socialMediaLinks?.facebook} target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href={Setting?.data?.socialMediaLinks?.twitter} target="_blank">
                        <i className="fab fa-x-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href={Setting?.data?.socialMediaLinks?.instagram} target="_blank">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href={Setting?.data?.socialMediaLinks?.linkedin} target="_blank">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-links">
                <h2>Company</h2>
                <Link to="/">Home</Link>
                <Link to="/About">About Us</Link>
                <Link to="/Destinations">Destinations </Link>
                <Link to="/Contact">Contact Us </Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-links">
                <h2>Get Help</h2>
                <Link to="/Terms">Terms & Condition</Link>
                <Link to="/Privacy">Privacy Police</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-links">
                <h2>Get Help</h2>
                <span>
                  Email:{" "}
                  <a href={`mailto:${Setting?.data?.email}`}>{Setting?.data?.email}</a>
                </span>
                {Setting?.data?.phoneNumbers?.map((x, index) => (
                  <a href={`tel:${x.number}`} key={index}>
                    {x.label} :{x.number}
                  </a>
                ))}
                {/* <span>
                  Call Us: <a href="tel:123-456-890">123-456-890 </a>
                </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="copyRight">
          <p>
            @Copyright tours store . All Rights Reserved <br /> Powered by
            <a href="https://addictaco.com" target="_blank">
              addictaco
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer_web;
