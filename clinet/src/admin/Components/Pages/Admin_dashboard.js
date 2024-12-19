import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Requests from "../Assets/img/Icon (7).png";
import Pending from "../Assets/img/Icon (3).png";
import Rejected from "../Assets/img/Icon (8).png";
import Confirmed from "../Assets/img/Icon (6).png";
import Cancelled from "../Charts/Cancelled";
import Breakdown from "../Charts/Breakdown";
import Booking_time from "../Charts/Booking_time";
import Revenue_Time from "../Charts/Revenue_Time";
import Booking_tour from "../Charts/Booking_tour";
import Footer from "../Footer/Footer";

function Admin_Dashboard() {
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
                  <img src={Requests} alt="Requests" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>24</h2>
                    <span>Total Bookings</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Pending} alt="Pending" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>6</h2>
                    <span>Upcoming Tours</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Rejected} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>21.5K</h2>
                    <span>Total Revenue</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Confirmed} alt="Confirmed" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>12</h2>
                    <span>Number of Vendors</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="row">
                <div className="col-md-6">
                  <div className="dashboard-charts time">
                    <h2>Booking Over time</h2>
                    <h3>2.5K</h3>
                    <Booking_time />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="dashboard-charts Tour">
                    <h2>Bookings by Tour</h2>
                    <Booking_tour />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="dashboard-charts Breakdown">
                    <h2>Review Breakdown</h2>
                    <Breakdown />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="dashboard-charts Revenue">
                    <h2>Revenue Over Time</h2>
                    <Revenue_Time />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="dashboard-charts Cancelled">
                    <h2>Cancelled tours</h2>
                    <Cancelled />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin_Dashboard;
