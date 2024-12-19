
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Requests from "../Assets/img/Icon (3).png";
import Tours from "../Assets/img/Icon (7).png";
import Revenue from "../Assets/img/Icon (8).png";
import Vendors from "../Assets/img/Icon (9).png";
import Footer from "../Footer/Footer";
import { useQuery } from "react-query";
import { getAllContacts } from "../../../services/apiservices/contactService";
import TableContacts from "./TableContacts";
import KeyTours from "../../../loadingspinner/KeyTours";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function AdminContacts() {
  const [path, setPath] = useState("Admin_Contact_details");
  const {
    data: contactData,
    isLoading,
    error,
  } = useQuery("Contacts", getAllContacts);

  if (isLoading) return <KeyTours />;
  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      </Box>
    );
  }
  return (
    <>
      <div className="main">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="dev-table">
          <Navbar />
          <div className="content-card">
            {/* <div className="row">
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Tours} alt="Pending" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>4</h2>
                    <span>Tours of the day</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Requests} alt="Requests" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>24</h2>
                    <span>Total Tours</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Revenue} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>21.5K</h2>
                    <span>Total Revenue</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Vendors} alt="Confirmed" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>12</h2>
                    <span>Number of Vendors</span>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="table-card">
              <TableContacts
                path={path}
                dataToDisplay={contactData?.data.data}
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AdminContacts;
