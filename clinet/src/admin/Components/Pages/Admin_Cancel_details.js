import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Swal from "sweetalert2";
import KeyTours from "../../../loadingspinner/KeyTours";
import { getCancelById,  } from '../../../services/apiservices/TourService';

function Admin_Cancel_details() {
  const { id: currentPath } = useParams(); // Get the id from the route params
  const navigate = useNavigate();

  const { data: tourData, error, isLoading } = useQuery(
    ["tour", currentPath],
    () => getCancelById(currentPath)
  );

  const tour = tourData?.data;
  console.log(tourData);

  if (isLoading) return <KeyTours />;

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    return null;
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
            <div className="requests">
              <h2>
                Dashboard / Requests / <span>Cancel By Vendor</span>
              </h2>
              <div className="requests-status">
                <h2>
                  Tour ID <span>{tour?.tourId}</span>
                </h2>
              </div>
              <div>

              {tour?.bookingUserInfo.map((x, index) => (
                    <div className="row">
                        <div className="col-md-12"><h3 className="mt-3 mb-3">User Info</h3></div>
                        <div className="col-md-3">
                            <label>User Email</label>
                            <h2>{x.userEmail}</h2>
                        </div>
                        <div className="col-md-3">
                            <label>User Id</label>
                            <h2>{x.userId}</h2>
                        </div>
                        <div className="col-md-3">
                            <label>User Name</label>
                            <h2>{x.userName}</h2>
                        </div>
                        <div className="col-md-3">
                            <label>Phone</label>
                            <h2>{x.phone}</h2>
                        </div>
                        <div className="col-md-12"><h3 className="mt-3 mb-3">Booking Info</h3></div>
                        <div className="col-md-3">
                            <label>Booking Date</label>
                            <h2>{x.bookingDate
                          ? new Date(x.bookingDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }) 
                          : x.bookingDate}</h2>
                        </div>
                        <div className="col-md-3">
                            <label>Booking Id</label>
                            <h2>{x.bookingId}</h2>
                        </div>
                        <div className="col-md-3">
                            <label>Booking Status</label>
                            <h2>{x.bookingStatus}</h2>
                        </div>
                        <div className="col-md-3">
                            <label>Price</label>
                            <h2>{x.price}</h2>
                        </div>
                        <div className="col-md-12"><h3 className="mt-3 mb-3">Tour Info</h3></div>
                        <div className="col-md-4">
                            <label>Tour Title</label>
                            <h2>{x.tourtitle}</h2>
                        </div>
                        <div className="col-md-4">
                            <label>Tour ID</label>
                            <h2>{tour?.tourId}</h2>
                        </div>
                    </div>
                ))}
              </div>

            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin_Cancel_details;