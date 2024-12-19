import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../Assets/img/Group 37325.png";
import "../Assets/Css/Navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "../Login/AuthProvider";

function Navbar_Web() {
  

  const token = localStorage.getItem('accessToken');


  return (
    <div className="navbar">
      <div className="container">
        <div className="nav">
          <div className="nav-brand">
            <Link to="/" className="">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Destinations"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Destinations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/RegisterVendor"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Be a Partner
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Guide"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Travel Guide
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/About"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Contact"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          {token ? <Link to="/Web_Profile" className="Web-Profile-button">
            Profile
          </Link> : <Link to="/Login_Web" className="Web-Profile-button">
            Login
          </Link>}
          
          <a
            className="bars d-block d-lg-none"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <i className="fa fa-bars"></i>
          </a>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div className="nav-brand">
            <Link to="/" className="">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="nav-links">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Destinations"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Destinations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/RegisterVendor"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  be a partner
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Guide"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Travel Guide
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/About"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Contact"
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar_Web;
