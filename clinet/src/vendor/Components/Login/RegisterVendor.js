import React, { useEffect, useState } from "react";
import img from "../Assets/img/1d3c9f5d19b0c14d52eef9f7a1b119bd.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Assets/Css/Login.css";
import Swal from "sweetalert2";
import axios from "axios";
import Api from "../../../services/api";

function RegisterVendor() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [company_name, setCompany] = useState();
  const [company_address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [bank_account, setAccount] = useState();
  const [bank, setBank] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
    company_address: "",
    phone: "",
    image: [],
    imagesthubnails: [],
    bank_account: "",
    bank: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("company_name", formData.company_name);
    form.append("company_address", formData.company_address);
    form.append("phone", formData.phone);
    form.append("image", formData.image);
    form.append("imagesthubnails", formData.imagesthubnails);
    form.append("bank_account", formData.bank_account);
    form.append("bank", formData.bank);
    const response = await axios
      .post(`${Api}/api/vendors`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    setFormData("");
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
                    <h1>Welcome</h1>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="username"
                        value={formData.name}
                        onChange={handleChange}
                        // onChange={(name) => setName(name)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="Password"
                        name="password"
                        placeholder="Password"
                        // onChange={(password) => setPassword(password)}
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        name="company_name"
                        placeholder="Company Name"
                        // onChange={(company_name) => setCompany(company_name)}
                        value={formData.company_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Company Address</label>
                      <input
                        type="text"
                        name="company_address"
                        placeholder="Company Address"
                        // onChange={(company_address) =>
                        //   setAddress(company_address)
                        // }
                        value={formData.company_address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>phone</label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="phone"
                        // onChange={(phone) => setPhone(phone)}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Bank Account</label>
                      <input
                        type="number"
                        name="bank_account"
                        placeholder="bank_account"
                        value={formData.bank_account}
                        onChange={handleChange}
                        // onChange={(bank_account) => setAccount(bank_account)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Bank Name</label>
                      <input
                        type="text"
                        name="bank"
                        placeholder="bank name"
                        value={formData.bank}
                        onChange={handleChange}
                        // onChange={(bank) => setBank(bank)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>image</label>
                      <input
                        id="image"
                        className="file"
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Files</label>
                      <input
                        id="imagesthubnails"
                        className="file"
                        type="file"
                        multiple
                        name="imagesthubnails"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="login-buttons">
                      <button className="signIn" onClick={handleSubmit}>
                        Sign Up
                      </button>
                      {/* <Link to="/Login_Web" className="signUp">
                        Sign In
                      </Link> */}
                    </div>
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

export default RegisterVendor;
