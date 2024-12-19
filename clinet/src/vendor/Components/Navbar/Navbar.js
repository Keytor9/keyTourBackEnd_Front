import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../Assets/Css/Navbar.css";
import "../Assets/Css/Sidebar.css";
import Logo from "../Assets/img/Group 37325.png";
import DefaultAdminImage from "../Assets/img/Frame 35587.png"; // Default image if no user image
import Dropdown from "react-bootstrap/Dropdown";
import Cookies from "js-cookie";
import Api from "../../../services/api"; // Import the login service

function Navbar_Vendor(props) {
  const token = Cookies.get('tokenvendor');
  const user = JSON.parse(Cookies.get('uservendor'));
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({
    name: user?.name,
    email: user?.email,
    name: "",
    email: "",
    image: DefaultAdminImage,
  });
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    // Check if token exists in cookies
    const token = Cookies.get("token");
    if (token) {
      setTokenExists(true); // Token exists, so show the logout button
    }

    // Fetch vendor data from cookies
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setVendor({
        name: user.name,
        email: user.email,
        image: user.image
          ? `${process.env.REACT_APP_API_URL}/${user.image}`
          : DefaultAdminImage,
      });
    }
  }, []);

  const handleLogout = () => {
    // Clear cookies and redirect to login
      Cookies.remove('tokenvendor'); // Remove token
      Cookies.remove('uservendor');  // Remove user data
    navigate("/Login_vendor");
  };

  return (
    <div className="navbar">
      <div className="navbar-details">
        <Link to="/Add_Tour" className="add-tour">
          <h2>Add New Tour</h2>
        </Link>
        {/* <div className="dropdown bell">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa fa-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
        <Link to="/Vendor_Profile" className="profile-button">
          <img
            src={`${Api}/${user.image}`}
            alt="Vendor Photo"
            className="admin-photo"
          />
          <h2>{user.name}</h2>
          {/* <h5>{vendor.email}</h5> */}
        </Link>
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

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="side">
            <div className="side-brand">
              <img src={Logo} alt="logo" />
            </div>
            <div className="sidebar-links">
              <NavLink
                to="/Vendor_Dashboard"
                className={({ isActive }) =>
                  isActive ? "active sidebar-link" : "sidebar-link"
                }
              >
                {/* SVG and link to Dashboard */}
                Dashboard
              </NavLink>
              <NavLink
                to="/Vendor_Tour"
                className={({ isActive }) =>
                  isActive ? "active sidebar-link" : "sidebar-link"
                }
              >
                {/* SVG and link to Tour */}
                Tour
              </NavLink>
              <NavLink
                to="/Vendor_Bookings"
                className={({ isActive }) =>
                  isActive ? "active sidebar-link" : "sidebar-link"
                }
              >
                Bookings Analysis
              </NavLink>
              {/* <NavLink
                to="/Vendor_Payments"
                className={({ isActive }) =>
                  isActive ? "active sidebar-link" : "sidebar-link"
                }
              >
                Payments Analysis
              </NavLink> */}
              <NavLink
                to="/Vendor_Reviews"
                className={({ isActive }) =>
                  isActive ? "active sidebar-link" : "sidebar-link"
                }
              >
                {/* SVG and link to Reviews */}
                Reviews
              </NavLink>
            </div>

            {/* Show Logout button only if token exists */}
              <NavLink
                to="/Login_vendor"
                className="sidebar-link logout-button"
                onClick={handleLogout}
              >
                {/* SVG and logout link */}
                Log out
              </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar_Vendor;
