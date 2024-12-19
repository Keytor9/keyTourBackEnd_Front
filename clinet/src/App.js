import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import "./admin/Components/Assets/Css/Web.css";
import "./admin/Components/Assets/Css/Footer.css";
import Admin_Dashboard from "./admin/Components/Pages/Admin_dashboard";
import Admin_Bookings from "./admin/Components/Pages/Admin_Bookings";
// import Admin_Admins from "./admin/Components/Pages/Admin_Admins";
import { AdminRoute } from './admin/Components/protectedcomponent/ProtectedComponents';
import { VendorAddtour,VendorDashboard } from './vendor/Components/protectedcomponent/ProtectedComponents';

import Admin_Attributes from "./admin/Components/Pages/Admin_Attributes";
import Admin_Content from "./admin/Components/Pages/Admin_Content";
import Admin_Payments from "./admin/Components/Pages/Admin_Payments";
import Admin_Requests from "./admin/Components/Pages/Admin_Requests";
import Admin_Reviews from "./admin/Components/Pages/Admin_Reviews";
import Admin_Vendors from "./admin/Components/Pages/Admin_Vendors";
import Admin_Users from "./admin/Components/Pages/Admin_Users";
import Login_admin from "./admin/Components/Login/Login";
import Admin_Requests_details from "./admin/Components/Pages/Admin_Request_details";
import Admin_Booking_details from "./admin/Components/Pages/Admin_Booking_details";
import Admin_Vendor_details from "./admin/Components/Pages/Admin_Vendors_details";
import Admin_Vendors_details from "./admin/Components/Pages/Admin_Vendors_details";
import Admin_Users_details from "./admin/Components/Pages/Admin_Users_details";
import Admin_Profile from "./admin/Components/Pages/Admin_Profile";
import Vendor_Dashboard from "./vendor/Components/Pages/Vendor_dashboard";
import Add_Tour from "./vendor/Components/Pages/Add_Tour";
import Home from "./Web/Components/Pages/Home";
import Destinations from "./Web/Components/Pages/Destinations";
import About from "./Web/Components/Pages/About";
import Contact from "./Web/Components/Pages/Contact";
import Terms from "./Web/Components/Pages/Terms";
import Privacy from "./Web/Components/Pages/Privacy";
import Guide from "./Web/Components/Pages/Guide";
import Web_Profile from "./Web/Components/Pages/Web_Profile";
import Login_Web from "./Web/Components/Login/Login";
import Register_Web from "./Web/Components/Login/Register";
import Destinations_tours from "./Web/Components/Pages/Destinations_tours";
import Tour_details from "./Web/Components/Pages/Tour_details";
import LoginAdmin from "./admin/Components/Login/LoginAdmin";
import Unauthorized from "./admin/Components/protectedcomponent/Unauthorized ";
import Vendor_Tour from './vendor/Components/Pages/Vendor_Tour';
import Vendor_Bookings from './vendor/Components/Pages/Vendor_Booking';
import Vendor_Reviews from './vendor/Components/Pages/Vendor_Reviews';
import RegisterVendor from "./vendor/Components/Login/RegisterVendor";
import Booking_details from "./Web/Components/Pages/BookingDetails";
import Vendor_Profile from "./vendor/Components/Pages/Vendor_Profile";
import SuccessTour from "./Web/Components/Pages/SuccessTour";
import AdminContacts from "./admin/Components/Pages/AdminContacts";
import AboutUsComponent from "./admin/Components/Pages/AboutUsComponent";
import BlogComponent from "./admin/Components/Pages/BlogComponent";
import TestingFirebase from "./TestingFirebase";
import TourDetails from "./vendor/Components/Pages/TourDetails";
import Otp from "./Web/Components/Login/OTP";
import Vendor_Booking_details from "./vendor/Components/Pages/Vendor_Booking_details";
import Admin_Notification from "./admin/Components/Pages/Admin_notfacation";
import Vendor_Notification from "./vendor/Components/Pages/Vendor_notfacation";
import Admin_Cancel_details from "./admin/Components/Pages/Admin_Cancel_details";
import NotificationScheduler from "./admin/Components/Pages/NotificationScheduler";


function App() {
  const { id } = useParams();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<TestingFirebase />} />
        <Route path="/testinga" element={<NotificationScheduler />} />



        <Route path="/Destinations" element={<Destinations />} />
        <Route
          path="/Destinations_tours/:id"
          element={<Destinations_tours />}
        />
        <Route path="/Tour_details/:id" element={<Tour_details />} />
        <Route path="/About" element={<About />} />
        <Route path="/Web_Profile" element={<Web_Profile />} />
        <Route path="/Login_Web" element={<Login_Web />} />
        <Route path="/Register_Web" element={<Register_Web />} />
        <Route path="/RegisterVendor" element={<RegisterVendor />} />
        <Route path="/Booking_details/:id" element={<Booking_details />} />
        <Route path="/SuccessTour/:id" element={<SuccessTour />} />
        <Route path="/OTP" element={<Otp />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/Guide" element={<Guide />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Admin_Profile" element={<Admin_Profile />} />
        <Route path="/Admin_Bookings" element={<Admin_Bookings />} />
        <Route path="/Admin_Cancel_details/:id" element={<Admin_Cancel_details />} />
        <Route
          path="/Admin_Booking_details/:id"
          element={<Admin_Booking_details />}
        />
        <Route path="/Admin_Content" element={<Admin_Content />} />
           <Route
          path="/Admin_About_Us"
          element={<AboutUsComponent />}
        />
              <Route
          path="/Admin_Blogs"
          element={<BlogComponent />}
        />
        <Route path="/adminlogin" element={<LoginAdmin />} />
        {/* <Route path="/vendorlogin" element={<LoginVendor />} /> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/Admin_Admins" element={<AdminRoute />} />
        <Route path="/Admin_Dashboard" element={<Admin_Dashboard />} />
        <Route path="/Admin_contact" element={<AdminContacts />} />

        <Route path="/Admin_Attributes" element={<Admin_Attributes />} />
        <Route path="/Admin_Payments" element={<Admin_Payments />} />
        <Route path="/Admin_Notification" element={<Admin_Notification />} />
        <Route path="/Vendor_Notification" element={<Vendor_Notification />} />
        <Route path="/Admin_Requests" element={<Admin_Requests />} />
        <Route
          path="/Admin_Requests_details/:id"
          element={<Admin_Requests_details />}
        />
        <Route path="/Admin_Reviews" element={<Admin_Reviews />} />
        <Route path="/Admin_Vendors" element={<Admin_Vendors />} />
        <Route
          path="/Admin_Vendors_details/:id"
          element={<Admin_Vendors_details />}
        />
        <Route path="/Admin_Users" element={<Admin_Users />} />
        <Route
          path="/Admin_Users_details/:id"
          element={<Admin_Users_details />}
        />
        <Route path="/Login_vendor" element={<Login_admin />} />
        <Route path="/Vendor_Dashboard" element={<VendorDashboard />} />
        <Route path="/Vendor_Bookings" element={<Vendor_Bookings />} />
        <Route path="/Vendor_Booking_details/:id" element={<Vendor_Booking_details />} />
        {/* <Route path="/Vendor_Payments" element={< Vendor_Payments />} /> */}
        <Route path="/Vendor_Profile" element={<Vendor_Profile />} />
        <Route path="/Vendor_Reviews" element={<Vendor_Reviews />} />
        <Route path="/Vendor_Tour" element={<Vendor_Tour />} />
        <Route path="/tourdetails/:id" element={<TourDetails />} />

        <Route path="/Add_Tour" element={<VendorAddtour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
