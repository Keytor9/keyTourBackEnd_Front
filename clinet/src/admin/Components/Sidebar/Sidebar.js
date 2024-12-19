import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../Assets/Css/Sidebar.css";
import Logo from "../Assets/img/Group 37325.png";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Api from '../../../services/api';
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Clear the token and user from cookies
      Cookies.remove('tokenadmin'); // Remove token
      Cookies.remove('useradmin');  // Remove user data
      
      // Optionally, you can make an API call to invalidate the session on the server
      // await axios.post(`${Api}/auth/logout`);

      // Navigate to the home page after logout
      navigate('/adminlogin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <div className="side">
      <div className="side-brand">
        <img src={Logo} alt="logo" />
      </div>
      <div className="sidebar-links">
        <div>
          <NavLink
            to="/Admin_Dashboard"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.04 7.31994L14.28 3.28994C12.71 2.18994 10.3 2.24994 8.78999 3.41994L3.77999 7.32994C2.77999 8.10994 1.98999 9.70994 1.98999 10.9699V17.8699C1.98999 20.4199 4.05999 22.4999 6.60999 22.4999H17.39C19.94 22.4999 22.01 20.4299 22.01 17.8799V11.0999C22.01 9.74994 21.14 8.08994 20.04 7.31994ZM12.75 18.4999C12.75 18.9099 12.41 19.2499 12 19.2499C11.59 19.2499 11.25 18.9099 11.25 18.4999V15.4999C11.25 15.0899 11.59 14.7499 12 14.7499C12.41 14.7499 12.75 15.0899 12.75 15.4999V18.4999Z"
                fill="#939EB5"
              />
            </svg>
            Dashboard
          </NavLink>
          <NavLink
            to="/Admin_Requests"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 2.5H7C4.24 2.5 2 4.73 2 7.48V13.46V14.46C2 17.21 4.24 19.44 7 19.44H8.5C8.77 19.44 9.13 19.62 9.3 19.84L10.8 21.83C11.46 22.71 12.54 22.71 13.2 21.83L14.7 19.84C14.89 19.59 15.19 19.44 15.5 19.44H17C19.76 19.44 22 17.21 22 14.46V7.48C22 4.73 19.76 2.5 17 2.5ZM8 12.5C7.44 12.5 7 12.05 7 11.5C7 10.95 7.45 10.5 8 10.5C8.55 10.5 9 10.95 9 11.5C9 12.05 8.56 12.5 8 12.5ZM12 12.5C11.44 12.5 11 12.05 11 11.5C11 10.95 11.45 10.5 12 10.5C12.55 10.5 13 10.95 13 11.5C13 12.05 12.56 12.5 12 12.5ZM16 12.5C15.44 12.5 15 12.05 15 11.5C15 10.95 15.45 10.5 16 10.5C16.55 10.5 17 10.95 17 11.5C17 12.05 16.56 12.5 16 12.5Z"
                fill="#939EB5"
              />
            </svg>
            Requests
          </NavLink>
          <NavLink
            to="/Admin_Bookings"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.68569 5.31128C5.08585 5.31128 4.59784 5.79929 4.59784 6.39919C4.59784 6.99903 5.08585 7.48705 5.68569 7.48705C6.28559 7.48705 6.77361 6.99903 6.77361 6.39919C6.77361 5.79929 6.28559 5.31128 5.68569 5.31128Z"
                fill="#939EB5"
              />
              <path
                d="M22.3268 28.9934C22.8275 27.786 22.2545 26.4014 21.0472 25.9008C19.8398 25.4002 18.4552 25.9731 17.9546 27.1805C17.454 28.3879 18.0269 29.7725 19.2343 30.2731C20.4416 30.7737 21.8262 30.2007 22.3268 28.9934Z"
                fill="#939EB5"
              />
              <path
                d="M15.8953 28.0805C15.8953 27.8364 15.9172 27.5976 15.957 27.3647H3.69007C2.69366 27.3647 1.88298 26.5541 1.88298 25.5576C1.88298 24.5611 2.69366 23.7505 3.69007 23.7505H12.1465C14.0692 23.7505 15.6335 22.1862 15.6335 20.2635C15.6335 18.3408 14.0693 16.7765 12.1465 16.7765H8.42263L7.30466 18.6456H12.1465C13.0386 18.6456 13.7644 19.3713 13.7644 20.2635C13.7644 21.1556 13.0386 21.8814 12.1465 21.8814H3.69007C1.66302 21.8814 0.0138499 23.5305 0.0138499 25.5576C0.0138499 27.5846 1.66302 29.2338 3.69007 29.2338H16.0562C15.9495 28.8586 15.8954 28.4705 15.8953 28.0805ZM30.9993 15.1442C30.992 14.964 30.9328 14.7897 30.8287 14.6423C30.7246 14.495 30.58 14.381 30.4126 14.314L20.4787 10.3404C20.3368 10.2837 20.1833 10.2626 20.0315 10.279C19.8796 10.2954 19.7341 10.3487 19.6077 10.4343C19.4812 10.5199 19.3776 10.6352 19.3061 10.7701C19.2345 10.905 19.197 11.0554 19.197 11.2081V23.9498C19.5034 23.8802 19.8167 23.845 20.131 23.8447C20.4456 23.845 20.7592 23.8803 21.066 23.95V20.6919L30.4809 16.0187C30.6425 15.9386 30.7774 15.8133 30.8694 15.6581C30.9614 15.5029 31.0065 15.3245 30.9993 15.1442ZM11.4614 6.2837C11.4614 3.11872 8.8957 0.552979 5.73072 0.552979C2.56574 0.552979 0 3.11872 0 6.2837V6.30747C0 7.45145 0.306089 8.57456 0.886516 9.56039L5.24749 16.967C5.44489 17.3022 5.92922 17.3039 6.12892 16.97L10.5523 9.5746C11.1473 8.57998 11.4614 7.44268 11.4614 6.2837ZM5.68567 9.35603C4.05519 9.35603 2.72868 8.02952 2.72868 6.39904C2.72868 4.76856 4.05519 3.44205 5.68567 3.44205C7.31615 3.44205 8.64266 4.76856 8.64266 6.39904C8.64266 8.02958 7.31615 9.35603 5.68567 9.35603Z"
                fill="#939EB5"
              />
            </svg>
            Bookings
          </NavLink>
          <NavLink
            to="/Admin_Attributes"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 9C7.04493 9 8.5 7.54493 8.5 5.75C8.5 3.95507 7.04493 2.5 5.25 2.5C3.45507 2.5 2 3.95507 2 5.75C2 7.54493 3.45507 9 5.25 9Z"
                fill="#939EB5"
              />
              <path
                d="M5 22.5C6.65685 22.5 8 21.1569 8 19.5C8 17.8431 6.65685 16.5 5 16.5C3.34315 16.5 2 17.8431 2 19.5C2 21.1569 3.34315 22.5 5 22.5Z"
                fill="#939EB5"
              />
              <path
                d="M19 22.5C20.6569 22.5 22 21.1569 22 19.5C22 17.8431 20.6569 16.5 19 16.5C17.3431 16.5 16 17.8431 16 19.5C16 21.1569 17.3431 22.5 19 22.5Z"
                fill="#939EB5"
              />
              <path
                d="M19.17 16.48C18.2 13.7 15.58 11.83 12.63 11.83C12.62 11.83 12.61 11.83 12.6 11.83L9.07 11.84C7.55 11.86 6.19 10.83 5.78 9.35V7.51C5.78 7.09 5.44 6.75 5.01 6.75C4.58 6.75 4.25 7.09 4.25 7.51V18.73C4.25 19.15 4.59 19.49 5.01 19.49C5.43 19.49 5.78 19.15 5.78 18.73V12.11C6.66 12.89 7.81 13.37 9.06 13.37C9.07 13.37 9.07 13.37 9.08 13.37L12.61 13.36C12.62 13.36 12.62 13.36 12.63 13.36C14.92 13.36 16.97 14.81 17.72 16.98C17.84 17.3 18.13 17.5 18.45 17.5C18.53 17.5 18.62 17.49 18.7 17.46C19.1 17.32 19.31 16.88 19.17 16.48Z"
                fill="#939EB5"
              />
            </svg>
            Attributes
          </NavLink>
          <NavLink
            to="/Admin_Admins"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
                fill="#939EB5"
              />
              <path
                d="M14.08 14.1499C11.29 12.2899 6.74002 12.2899 3.93002 14.1499C2.66002 14.9999 1.96002 16.1499 1.96002 17.3799C1.96002 18.6099 2.66002 19.7499 3.92002 20.5899C5.32002 21.5299 7.16002 21.9999 9.00002 21.9999C10.84 21.9999 12.68 21.5299 14.08 20.5899C15.34 19.7399 16.04 18.5999 16.04 17.3599C16.03 16.1299 15.34 14.9899 14.08 14.1499Z"
                fill="#939EB5"
              />
              <path
                d="M19.99 7.3401C20.15 9.2801 18.77 10.9801 16.86 11.2101C16.85 11.2101 16.85 11.2101 16.84 11.2101H16.81C16.75 11.2101 16.69 11.2101 16.64 11.2301C15.67 11.2801 14.78 10.9701 14.11 10.4001C15.14 9.4801 15.73 8.1001 15.61 6.6001C15.54 5.7901 15.26 5.0501 14.84 4.4201C15.22 4.2301 15.66 4.1101 16.11 4.0701C18.07 3.9001 19.82 5.3601 19.99 7.3401Z"
                fill="#939EB5"
              />
              <path
                d="M21.99 16.5899C21.91 17.5599 21.29 18.3999 20.25 18.9699C19.25 19.5199 17.99 19.7799 16.74 19.7499C17.46 19.0999 17.88 18.2899 17.96 17.4299C18.06 16.1899 17.47 14.9999 16.29 14.0499C15.62 13.5199 14.84 13.0999 13.99 12.7899C16.2 12.1499 18.98 12.5799 20.69 13.9599C21.61 14.6999 22.08 15.6299 21.99 16.5899Z"
                fill="#939EB5"
              />
            </svg>
            Admins
          </NavLink>
          {/* <NavLink
            to="/Admin_Payments"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.75 16.4201H13.4C14.05 16.4201 14.59 15.8401 14.59 15.1401C14.59 14.2701 14.28 14.1001 13.77 13.9201L12.76 13.5701V16.4201H12.75Z"
                fill="#939EB5"
              />
              <path
                d="M11.97 2.39992C6.45001 2.41992 1.98001 6.90992 2.00001 12.4299C2.02001 17.9499 6.51001 22.4199 12.03 22.3999C17.55 22.3799 22.02 17.8899 22 12.3699C21.98 6.84992 17.49 2.38992 11.97 2.39992ZM14.26 12.4999C15.04 12.7699 16.09 13.3499 16.09 15.1399C16.09 16.6799 14.88 17.9199 13.4 17.9199H12.75V18.4999C12.75 18.9099 12.41 19.2499 12 19.2499C11.59 19.2499 11.25 18.9099 11.25 18.4999V17.9199H10.89C9.25001 17.9199 7.92001 16.5399 7.92001 14.8399C7.92001 14.4299 8.26001 14.0899 8.67001 14.0899C9.08001 14.0899 9.42001 14.4299 9.42001 14.8399C9.42001 15.7099 10.08 16.4199 10.89 16.4199H11.25V13.0399L9.74001 12.4999C8.96001 12.2299 7.91001 11.6499 7.91001 9.85992C7.91001 8.31992 9.12001 7.07992 10.6 7.07992H11.25V6.49992C11.25 6.08992 11.59 5.74992 12 5.74992C12.41 5.74992 12.75 6.08992 12.75 6.49992V7.07992H13.11C14.75 7.07992 16.08 8.45992 16.08 10.1599C16.08 10.5699 15.74 10.9099 15.33 10.9099C14.92 10.9099 14.58 10.5699 14.58 10.1599C14.58 9.28992 13.92 8.57992 13.11 8.57992H12.75V11.9599L14.26 12.4999Z"
                fill="#939EB5"
              />
              <path
                d="M9.41998 9.87008C9.41998 10.7401 9.72998 10.9101 10.24 11.0901L11.25 11.4401V8.58008H10.6C9.94998 8.58008 9.41998 9.16008 9.41998 9.87008Z"
                fill="#939EB5"
              />
            </svg>
            Payments
          </NavLink> */}
          <NavLink
            to="/Admin_Vendors"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.00002 0.156006C11.647 0.156006 13.796 2.30501 13.796 4.95201C13.796 7.59901 11.647 9.74801 9.00002 9.74801C6.35302 9.74801 4.20402 7.59901 4.20402 4.95201C4.20402 2.30501 6.35302 0.156006 9.00002 0.156006ZM15.762 13.687C17.099 12.5941 18.7732 11.998 20.5 12C24.639 12 28 15.361 28 19.5C28 23.639 24.639 27 20.5 27C16.361 27 13 23.639 13 19.5C13 16.881 14.349 14.84 15.762 13.687ZM19.502 23.173C19.5177 23.4246 19.6277 23.6609 19.8102 23.8348C19.9926 24.0087 20.234 24.1073 20.486 24.1108C20.7381 24.1143 20.9821 24.0226 21.1694 23.8539C21.3566 23.6852 21.4733 23.452 21.496 23.201C21.571 23.182 21.644 23.16 21.714 23.135C22.638 22.808 23.306 22.097 23.306 20.86C23.306 19.649 22.477 19.026 21.314 18.687C20.911 18.569 20.467 18.483 20.079 18.353C19.9706 18.3195 19.8657 18.2753 19.766 18.221C19.735 18.203 19.694 18.193 19.694 18.152C19.694 17.847 19.933 17.734 20.187 17.699C20.7298 17.6366 21.2773 17.7676 21.733 18.069C21.8407 18.1442 21.9621 18.1974 22.0904 18.2257C22.2187 18.2539 22.3512 18.2566 22.4805 18.2337C22.6098 18.2107 22.7333 18.1624 22.844 18.0917C22.9547 18.021 23.0503 17.9292 23.1255 17.8215C23.2007 17.7138 23.2539 17.5924 23.2822 17.4641C23.3104 17.3359 23.3131 17.2033 23.2902 17.074C23.2672 16.9447 23.219 16.8212 23.1482 16.7105C23.0775 16.5998 22.9857 16.5042 22.878 16.429C22.4582 16.1454 21.9907 15.9398 21.498 15.822C21.4785 15.5727 21.3663 15.3397 21.1835 15.1689C21.0008 14.9981 20.7607 14.902 20.5106 14.8993C20.2605 14.8967 20.0185 14.9878 19.8322 15.1547C19.6459 15.3215 19.5288 15.5521 19.504 15.801C18.947 15.954 18.475 16.253 18.152 16.688C17.874 17.061 17.694 17.541 17.694 18.152C17.694 19.363 18.523 19.986 19.686 20.325C20.089 20.443 20.533 20.529 20.921 20.659C21.034 20.697 21.141 20.738 21.234 20.791C21.265 20.809 21.306 20.819 21.306 20.86C21.306 21.162 21.069 21.268 20.818 21.302C20.27 21.3614 19.7181 21.2316 19.254 20.934C19.1452 20.8605 19.0229 20.8092 18.8942 20.783C18.7655 20.7568 18.6329 20.7562 18.504 20.7812C18.2436 20.8317 18.0139 20.9836 17.8655 21.2035C17.7171 21.4234 17.6622 21.6932 17.7127 21.9536C17.7632 22.214 17.9152 22.4436 18.135 22.592C18.52 22.852 18.998 23.051 19.502 23.173ZM13.133 25.496C9.89702 25.5 5.48202 25.5 3.00702 25.5C2.23628 25.5001 1.49504 25.2037 0.936899 24.6722C0.378759 24.1407 0.0465142 23.4148 0.0090176 22.645L0.00801743 22.617C-0.0429686 20.2085 0.124382 17.8003 0.508017 15.422C0.763017 13.876 2.08602 11.932 3.43402 11.111L3.59702 11.013C3.76506 10.9125 3.95895 10.8637 4.15454 10.8726C4.35013 10.8815 4.53879 10.9477 4.69702 11.063C5.94102 11.967 7.47202 12.5 9.12602 12.5C10.78 12.5 12.311 11.967 13.555 11.063C13.7124 10.9487 13.8998 10.8828 14.0941 10.8734C14.2884 10.864 14.4813 10.9115 14.649 11.01L14.818 11.111C15.003 11.223 15.187 11.356 15.368 11.505C15.0663 11.6994 14.7758 11.9108 14.498 12.138C12.708 13.598 11 16.184 11 19.5C11 21.773 11.8 23.86 13.133 25.496Z"
                fill="#939EB5"
              />
            </svg>
            Vendors
          </NavLink>
          <NavLink
            to="/Admin_Notification"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.00002 0.156006C11.647 0.156006 13.796 2.30501 13.796 4.95201C13.796 7.59901 11.647 9.74801 9.00002 9.74801C6.35302 9.74801 4.20402 7.59901 4.20402 4.95201C4.20402 2.30501 6.35302 0.156006 9.00002 0.156006ZM15.762 13.687C17.099 12.5941 18.7732 11.998 20.5 12C24.639 12 28 15.361 28 19.5C28 23.639 24.639 27 20.5 27C16.361 27 13 23.639 13 19.5C13 16.881 14.349 14.84 15.762 13.687ZM19.502 23.173C19.5177 23.4246 19.6277 23.6609 19.8102 23.8348C19.9926 24.0087 20.234 24.1073 20.486 24.1108C20.7381 24.1143 20.9821 24.0226 21.1694 23.8539C21.3566 23.6852 21.4733 23.452 21.496 23.201C21.571 23.182 21.644 23.16 21.714 23.135C22.638 22.808 23.306 22.097 23.306 20.86C23.306 19.649 22.477 19.026 21.314 18.687C20.911 18.569 20.467 18.483 20.079 18.353C19.9706 18.3195 19.8657 18.2753 19.766 18.221C19.735 18.203 19.694 18.193 19.694 18.152C19.694 17.847 19.933 17.734 20.187 17.699C20.7298 17.6366 21.2773 17.7676 21.733 18.069C21.8407 18.1442 21.9621 18.1974 22.0904 18.2257C22.2187 18.2539 22.3512 18.2566 22.4805 18.2337C22.6098 18.2107 22.7333 18.1624 22.844 18.0917C22.9547 18.021 23.0503 17.9292 23.1255 17.8215C23.2007 17.7138 23.2539 17.5924 23.2822 17.4641C23.3104 17.3359 23.3131 17.2033 23.2902 17.074C23.2672 16.9447 23.219 16.8212 23.1482 16.7105C23.0775 16.5998 22.9857 16.5042 22.878 16.429C22.4582 16.1454 21.9907 15.9398 21.498 15.822C21.4785 15.5727 21.3663 15.3397 21.1835 15.1689C21.0008 14.9981 20.7607 14.902 20.5106 14.8993C20.2605 14.8967 20.0185 14.9878 19.8322 15.1547C19.6459 15.3215 19.5288 15.5521 19.504 15.801C18.947 15.954 18.475 16.253 18.152 16.688C17.874 17.061 17.694 17.541 17.694 18.152C17.694 19.363 18.523 19.986 19.686 20.325C20.089 20.443 20.533 20.529 20.921 20.659C21.034 20.697 21.141 20.738 21.234 20.791C21.265 20.809 21.306 20.819 21.306 20.86C21.306 21.162 21.069 21.268 20.818 21.302C20.27 21.3614 19.7181 21.2316 19.254 20.934C19.1452 20.8605 19.0229 20.8092 18.8942 20.783C18.7655 20.7568 18.6329 20.7562 18.504 20.7812C18.2436 20.8317 18.0139 20.9836 17.8655 21.2035C17.7171 21.4234 17.6622 21.6932 17.7127 21.9536C17.7632 22.214 17.9152 22.4436 18.135 22.592C18.52 22.852 18.998 23.051 19.502 23.173ZM13.133 25.496C9.89702 25.5 5.48202 25.5 3.00702 25.5C2.23628 25.5001 1.49504 25.2037 0.936899 24.6722C0.378759 24.1407 0.0465142 23.4148 0.0090176 22.645L0.00801743 22.617C-0.0429686 20.2085 0.124382 17.8003 0.508017 15.422C0.763017 13.876 2.08602 11.932 3.43402 11.111L3.59702 11.013C3.76506 10.9125 3.95895 10.8637 4.15454 10.8726C4.35013 10.8815 4.53879 10.9477 4.69702 11.063C5.94102 11.967 7.47202 12.5 9.12602 12.5C10.78 12.5 12.311 11.967 13.555 11.063C13.7124 10.9487 13.8998 10.8828 14.0941 10.8734C14.2884 10.864 14.4813 10.9115 14.649 11.01L14.818 11.111C15.003 11.223 15.187 11.356 15.368 11.505C15.0663 11.6994 14.7758 11.9108 14.498 12.138C12.708 13.598 11 16.184 11 19.5C11 21.773 11.8 23.86 13.133 25.496Z"
                fill="#939EB5"
              />
            </svg>
            Notifications
          </NavLink>
          <NavLink
            to="/Admin_Users"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.86 6 18.86H6.76C7.55 18.86 8.32 19.17 8.88 19.73L10.59 21.42C11.37 22.19 12.63 22.19 13.41 21.42L15.12 19.73C15.68 19.17 16.45 18.86 17.24 18.86H18C19.66 18.86 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2ZM12 5.55C13.08 5.55 13.95 6.43 13.95 7.5C13.95 8.56 13.11 9.41 12.07 9.45C12.03 9.45 11.97 9.45 11.92 9.45C10.87 9.41 10.04 8.56 10.04 7.5C10.05 6.43 10.92 5.55 12 5.55ZM14.75 14.69C13.24 15.7 10.76 15.7 9.25 14.69C7.92 13.81 7.92 12.35 9.25 11.46C10.77 10.45 13.25 10.45 14.75 11.46C16.08 12.35 16.08 13.8 14.75 14.69Z"
                fill="#939EB5"
              />
            </svg>
            Users
          </NavLink>
          <NavLink
            to="/Admin_Content"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 16V18.5C20.5 20.43 18.93 22 17 22H7C5.07 22 3.5 20.43 3.5 18.5V17.85C3.5 16.28 4.78 15 6.35 15H19.5C20.05 15 20.5 15.45 20.5 16Z"
                fill="#939EB5"
              />
              <path
                d="M15.5 2H8.5C4.5 2 3.5 3 3.5 7V14.58C4.26 13.91 5.26 13.5 6.35 13.5H19.5C20.05 13.5 20.5 13.05 20.5 12.5V7C20.5 3 19.5 2 15.5 2ZM13 10.75H8C7.59 10.75 7.25 10.41 7.25 10C7.25 9.59 7.59 9.25 8 9.25H13C13.41 9.25 13.75 9.59 13.75 10C13.75 10.41 13.41 10.75 13 10.75ZM16 7.25H8C7.59 7.25 7.25 6.91 7.25 6.5C7.25 6.09 7.59 5.75 8 5.75H16C16.41 5.75 16.75 6.09 16.75 6.5C16.75 6.91 16.41 7.25 16 7.25Z"
                fill="#939EB5"
              />
            </svg>
            Content
          </NavLink>
          <NavLink
            to="/Admin_contact"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.29 2.64004L15.22 6.43004C15.21 6.95004 15.54 7.64004 15.96 7.95004L18.44 9.83004C20.03 11.03 19.77 12.5 17.87 13.1L14.64 14.11C14.1 14.28 13.53 14.87 13.39 15.42L12.62 18.36C12.01 20.68 10.49 20.91 9.23003 18.87L7.47003 16.02C7.15003 15.5 6.39003 15.11 5.79003 15.14L2.45003 15.31C0.0600262 15.43 -0.619973 14.05 0.940027 12.23L2.92003 9.93004C3.29003 9.50004 3.46003 8.70004 3.29003 8.16004L2.27003 4.92004C1.68003 3.02004 2.74003 1.97004 4.63003 2.59004L7.58003 3.56004C8.08003 3.72004 8.83003 3.61004 9.25003 3.30004L12.33 1.08004C14 -0.109956 15.33 0.590044 15.29 2.64004Z"
                fill="#939EB5"
              />
            </svg>
            Contacts
          </NavLink>
          <NavLink
            to="/Admin_Reviews"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.29 2.64004L15.22 6.43004C15.21 6.95004 15.54 7.64004 15.96 7.95004L18.44 9.83004C20.03 11.03 19.77 12.5 17.87 13.1L14.64 14.11C14.1 14.28 13.53 14.87 13.39 15.42L12.62 18.36C12.01 20.68 10.49 20.91 9.23003 18.87L7.47003 16.02C7.15003 15.5 6.39003 15.11 5.79003 15.14L2.45003 15.31C0.0600262 15.43 -0.619973 14.05 0.940027 12.23L2.92003 9.93004C3.29003 9.50004 3.46003 8.70004 3.29003 8.16004L2.27003 4.92004C1.68003 3.02004 2.74003 1.97004 4.63003 2.59004L7.58003 3.56004C8.08003 3.72004 8.83003 3.61004 9.25003 3.30004L12.33 1.08004C14 -0.109956 15.33 0.590044 15.29 2.64004Z"
                fill="#939EB5"
              />
            </svg>
            Reviews
          </NavLink>
        </div>
        <NavLink
          to="/adminlogin"
          onClick={handleLogout}
          className={({ isActive }) =>
            isActive
              ? "active sidebar-link logout-button"
              : "sidebar-link logout-button"
          }
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.4 1.83325H13.0167C10.0833 1.83325 8.25 3.66658 8.25 6.59992V10.3124H13.9792C14.355 10.3124 14.6667 10.6241 14.6667 10.9999C14.6667 11.3758 14.355 11.6874 13.9792 11.6874H8.25V15.3999C8.25 18.3333 10.0833 20.1666 13.0167 20.1666H15.3908C18.3242 20.1666 20.1575 18.3333 20.1575 15.3999V6.59992C20.1667 3.66658 18.3333 1.83325 15.4 1.83325Z"
              fill="#E52600"
            />
            <path
              d="M4.18001 10.3124L6.07751 8.41494C6.21501 8.27744 6.27917 8.10327 6.27917 7.9291C6.27917 7.75494 6.21501 7.5716 6.07751 7.44327C5.81167 7.17744 5.37167 7.17744 5.10584 7.44327L2.03501 10.5141C1.76917 10.7799 1.76917 11.2199 2.03501 11.4858L5.10584 14.5566C5.37167 14.8224 5.81167 14.8224 6.07751 14.5566C6.34334 14.2908 6.34334 13.8508 6.07751 13.5849L4.18001 11.6874H8.25001V10.3124H4.18001Z"
              fill="#E52600"
            />
          </svg>
          Log out
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
