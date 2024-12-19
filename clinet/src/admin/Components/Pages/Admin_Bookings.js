import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Requests from "../Assets/img/Icon (3).png";
import Tours from "../Assets/img/Icon (7).png";
import Revenue from "../Assets/img/Icon (8).png";
import Vendors from "../Assets/img/Icon (9).png";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import { useQuery } from "react-query";
import { getAllBooking } from "../../../services/apiservices/bookingService";
import TableBooking from "./TableBooking";
import KeyTours from "../../../loadingspinner/KeyTours";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function Admin_Bookings() {
  const [path, setPath] = useState("Admin_Booking_details");
  const {
    data: bookingData,
    isLoading,
    error,
  } = useQuery("Booking", getAllBooking);
  console.log(bookingData);


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
            <div className="row">
              <div className="col-md-4">
                <div className="statistics">
                  <img src={Tours} alt="Pending" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{bookingData.analysis?.acceptedCount}</h2>
                    <span>Booking Paid</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="statistics">
                  <img src={Requests} alt="Requests" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{bookingData.analysis?.results}</h2>
                    <span>Total Booking</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="statistics">
                  <img src={Revenue} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{bookingData.analysis?.pendingCount}</h2>
                    <span>Booking pending</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-card">
              <TableBooking
                path={path}
                dataToDisplay={bookingData?.data}
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin_Bookings;
