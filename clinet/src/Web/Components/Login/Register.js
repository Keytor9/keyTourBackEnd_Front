import React, { useEffect, useState } from "react";
import img from "../Assets/img/1d3c9f5d19b0c14d52eef9f7a1b119bd.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Assets/Css/Login.css";
import Swal from "sweetalert2";
import axios from "axios";
import Api from "../../../services/api";
import { auth, provider } from "../../../firebase";
import Google from "../Assets/img/Google.png";
import { signInWithPopup } from "firebase/auth";

function Register_Web() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [_id, setId] = useState(localStorage.getItem("id") || "");

  
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
    e.preventDefault();
  
    try {
      const response = await axios.post(`${Api}/api/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // if (response.data?._id) {
        navigate(`/OTP?userId=${response.data.data._id}`);
        console.log(response.data);
      // } else {
      //   throw new Error("User ID not found in response");
      // }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setFormData(""); 
    }
  };
  

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
                      <label>Username</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="username"
                        value={formData.name}
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
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>WhatsApp number </label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="WhatsApp"
                        value={formData.phone}
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
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="login-buttons">
                      <button className="signIn" onClick={handleSubmit}>
                        Sign Up
                      </button>
                      <Link to="/Login_Web" className="signUp">
                        Sign In
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

export default Register_Web;
