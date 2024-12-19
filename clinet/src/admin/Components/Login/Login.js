import React, { useState } from "react";
import img from "../Assets/img/Frame 35546.png";
import Logo from "../Assets/img/Group 37325.png";
import { useNavigate } from "react-router-dom";
import "../Assets/Css/Login.css";
import { loginVendor } from "../../../services/apiservices/authService";
import { useToast } from "@chakra-ui/react"; // Import useToast

import Cookies from 'js-cookie';

function Login_admin() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const navigate = useNavigate();
  const toast = useToast(); // Initialize toast
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const result = await loginVendor(email, password); // Call the login service
console.log(result);
      if (result) {
        navigate("/Vendor_Dashboard"); // Navigate to admin dashboard on success
      }
    } catch (error) {
      // Display error message using Chakra UI toast
      toast({
        title: "Login failed",
        description: error.response?.data?.message || error.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      console.error('Login failed:', error.message);
    }
  };

  return (
    <>
      <div className="login">
        <div className="row h-100">
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <img src={img} alt="img" />
          </div>
        </div>
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <img src={Logo} alt="logo" className="logo" />
            </div>
            <h1>Welcome Back</h1>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="login-email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="d-flex align-items-center form-group-password">
                <input
                  name="password"
                  className="login-password"
                  placeholder="Enter Your password"
                  value={formData.password}
                  onChange={handleChange}
                  type={passwordShown ? "text" : "password"}
                />
                <i
                  onClick={togglePasswordVisiblity}
                  className={passwordShown ? "fa fa-eye-slash" : "fa fa-eye"}
                ></i>
              </div>
            </div>
            <button type="submit" className="submit">
              LogIn
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login_admin;
