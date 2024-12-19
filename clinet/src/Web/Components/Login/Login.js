import React, { useEffect, useState } from "react";
import img from "../Assets/img/Image (1).png";
import Logo from "../Assets/img/Group 37325.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Assets/Css/Login.css";
import Swal from "sweetalert2";
import axios from "axios";
import Api from "../../../services/api";
import Cookies from "js-cookie";
import { auth, provider } from "../../../firebase";
import Google from "../Assets/img/Google.png";
import { signInWithPopup } from "firebase/auth";
import {jwtDecode} from "jwt-decode";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Spinner,
  useToast,
  VStack,
  Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginAdmin } from "../../../services/apiservices/authService";

function Login_Web() {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [_id, setId] = useState(localStorage.getItem("id") || "");
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const toast = useToast(); // Chakra UI's useToast hook for notifications
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
  const navigate = useNavigate()
  const [isCookieSet, setCookie] = useState(Cookies.get("id"));
  
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        result.user.getIdToken().then((idToken) => {
          console.log("Firebase ID Token:", idToken);
          fetch("http://185.170.198.81/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "device":'web'
            },
            body: JSON.stringify({ idToken }),
          })
            .then((response) => response.json())
            .then((res) => {
              navigate("/");
              console.log(res);
              console.log(res.data.user._id);
              console.log(res.data.token);
              setId(res.data.user._id);
              setToken(res.data.token);
              localStorage.setItem("accessToken", res.data.token);
              localStorage.setItem("id", res.data.user._id);
              Cookies.set("id", res.data.user._id);
              setCookie(res.data.user._id);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  console.log(formData);
    try {
      const response = await axios.post(
        `${Api}/api/auth/login`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            device: "web",
            // role: "user",
          },
        }
      );
  
      // Successful response
      const userId = response.data.data.user._id;
      const token = response.data.data.token;
  
      console.log("User ID:", userId);
      console.log("Token:", token);
  
      setId(userId);
      setToken(token);
  
      // Save to localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("id", userId);
  
      // Save to cookies
      Cookies.set("id", userId);
      setCookie(userId);
  
      // Navigate to another page
      navigate("/");
      console.log(response);
  
      // Clear form data
      setFormData({});
    } catch (error) {
      console.error("Error during login:", error);
  
      // Handle error with SweetAlert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };
  

  
  // Handle form submission



  return (
    <>
      <div className="login-form">
        <div className="row h-100">
          <div className="col-md-6">
            <div className="web-login">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <h1>Welcome Back</h1>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="Password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="login-buttons">
                      <button className="signIn" onClick={handleSubmit}>Sign In</button>
                      <Link to="/Register_Web" className="signUp">
                        Sign up{" "}
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button onClick={handleLogin} className="login-with-google">
                      <img src={Google} alt="Google" />
                      <span>Login with Google</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 h-100">
            <img src={img} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login_Web;
