
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
import { getAllVendorreviews } from "../../../services/apiservices/reviewsService";
import ReviewTable from "../Table/ReviewTable";
function Vendor_Reviews() {
  const [path, setPath] = useState("Admin_Reviews");
  const { data: bookingData, isLoading, error } = useQuery(
    "reviewsvendor",
    getAllVendorreviews
  );

  if (isLoading) return <KeyTours />;
  if (error) {
    return <div>Error loading bookings: {error.message}</div>;
  }
  console.log(bookingData)
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
                    <span>Total Reviews</span>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-3">
                <div className="statistics">
                  <img src={Requests} alt="Requests" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>24</h2>
                    <span>Total Tours</span>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-3">
                <div className="statistics">
                  <img src={Vendors} alt="Confirmed" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>12</h2>
                    <span>Number of Vendors</span>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-3">
                <div className="statistics">
                  <img src={Revenue} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>21</h2>
                    <span>Cancelled </span>
                  </div>
                </div>
              </div> */}
            </div>
            <ReviewTable dataToDisplay={bookingData} path={path} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Vendor_Reviews;
