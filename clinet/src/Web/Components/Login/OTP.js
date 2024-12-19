import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Assets/Css/Login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Api from "../../../services/api";

function Otp() {
  const [otp, newOtp] = useState();
  const [verfied, setVerfied] = useState(false);
  const [otpVal, setOtpVal] = useState([]);
  const textBase = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  // console.log(object);
  const [formData, setFormData] = useState({
    userId: userId,
    otp: "123456",
  });

  // generate random otp for each first render

  useEffect(() => {
    newOtp(Math.floor(1000 + Math.random() * 9000));
  }, []);

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`${Api}/api/auth/verify-otp`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        navigate("/Login_Web");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  const ResendOTP = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`${Api}/api/auth/resend-otp`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {})
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const clearAll = () => {
    textBase.current.classList.remove("otp-error");
    textBase.current.childNodes.forEach((child) => {
      child.value = "";
    });
    setOtpVal([]);
    setVerfied(false);
  };

  const getOtp = () => {
    if (parseInt(otpVal.join("")) === otp) {
      textBase.current.classList.remove("otp-error");
      setVerfied(true);
    } else {
      textBase.current.classList.add("otp-error");
    }
  };

  const focusNext = (e) => {
    const childCount = textBase.current.childElementCount;
    const currentIndex = [...e.target.parentNode.children].indexOf(e.target);
    if (currentIndex !== childCount - 1) {
      e.target.nextSibling.focus();
    } else {
      const values = [];
      textBase.current.childNodes.forEach((child) => {
        values.push(child.value);
      });
      if (values.length !== 0) {
        setOtpVal(values);
      }
    }
  };

  useEffect(() => {
    if (otpVal.length === textBase.current.childElementCount) {
      getOtp();
    }
  }, [otpVal]);
  return (
    <div className="container">
      <div className="login-form">
        <form className="form" onSubmit={handleVerify}>
          <div className="row">
            <div className="col-md-12">
              <div className="forget text-center">
                {/* <Link to="/Login_Web" className="back">
                  <i className="fa fa-chevron-left"></i>Back to login
                </Link> */}
                <h1>Enter OTP</h1>
                <p>
                  We have share a code of your registered email address
                  robertfox@example.com
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="base">
                <div className="otp-base" ref={textBase}>
                  {new Array(6).fill(null).map((input) => {
                    return <input type="text" onChange={(e) => focusNext(e)} />;
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="resend">
                <a href="#!" onClick={ResendOTP}>
                  Resend Otp
                </a>
              </div>
            </div>
          </div>
          <button onClick={handleVerify} className="submit">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
