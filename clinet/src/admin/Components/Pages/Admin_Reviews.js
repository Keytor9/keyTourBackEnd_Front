import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Requests from "../Assets/img/Icon (3).png";
import Tours from "../Assets/img/Icon (7).png";
import Revenue from "../Assets/img/Icon (5).png";
import Vendors from "../Assets/img/Icon (9).png";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import { useQuery } from "react-query";
import KeyTours from "../../../loadingspinner/KeyTours";
import { getAllreviews } from "../../../services/apiservices/reviewsService";
import TableReviews from "./TableReviews";
function Admin_Reviews() {
  const [path, setPath] = useState("Admin_Reviews");
  const {
    data: reviewsData,
    isLoading,
    error,
  } = useQuery("reviews", getAllreviews);


  if (isLoading) return <KeyTours />;
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
              <div className="col-md-6">
                <div className="statistics">
                  <img src={Tours} alt="Pending" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{reviewsData.analysis.results}</h2>
                    <span>All Reviews</span>
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
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Revenue} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>21</h2>
                    <span>Cancelled </span>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="table-card">
            <TableReviews dataToDisplay={reviewsData} path={path} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin_Reviews;
