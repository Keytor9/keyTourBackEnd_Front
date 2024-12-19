import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Requests from "../Assets/img/Icon (3).png";
import Tours from "../Assets/img/Icon (7).png";
import Revenue from "../Assets/img/Icon (5).png";
import Vendors from "../Assets/img/Icon (9).png";
import Footer from "../Footer/Footer";
import BookingVendorsTable from "../Table/BookingVendorsTable";
import KeyTours from "../../../loadingspinner/KeyTours";
import { useQuery } from "react-query";
import { getAllVendorsBooking } from "../../../services/apiservices/bookingService";

function Vendor_Bookings() {
  const [path, setPath] = useState("Admin_Booking_details");

  const { data: bookingData, isLoading, error } = useQuery(
    "Bookingvendor",
    getAllVendorsBooking
  );

  console.log(bookingData);

  if (isLoading) return <KeyTours />;
  if (error) {
    return <div>Error loading bookings: {error.message}</div>;
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
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Tours} alt="Pending" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{bookingData?.analysis?.results}</h2>
                    <span>total bookings</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Requests} alt="Requests" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{bookingData?.analysis?.pendingCount}</h2>
                    <span> UnPaid</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Vendors} alt="Confirmed" />
                  <div className="d-flex flex-column justify-content-center w-100">
                  <h2>{bookingData?.analysis?.acceptedCount}</h2>

                    <span>Paid</span>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-3">
                <div className="statistics">
                  <img src={Revenue} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>21</h2>
                    <span>Refunds</span>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="table-card">
              <BookingVendorsTable dataToDisplay={bookingData?.data} path={path} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Vendor_Bookings;
