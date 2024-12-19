import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import person from "../Assets/img/Rectangle 25.png"; // Placeholder image
import Footer from "../Footer/Footer";
import { useParams } from "react-router";
import { useQuery } from 'react-query';
import { getUserById } from '../../../services/apiservices/UserService';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import KeyTours from "../../../loadingspinner/KeyTours";

function Admin_Users_details() {
  const { id } = useParams();
  const { data: userData, isLoading, error } = useQuery(['user', id], () => getUserById(id));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState(null); // Store details of clicked booking

  if (isLoading) return <KeyTours />;
  if (error) return <p>Error loading user details: {error.message}</p>;

  const user = userData?.data;

  const handleModalOpen = (booking) => {
    setModalData(booking);
    onOpen();
  };

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
                Users / <span>Users details</span>
              </h2>
              <div className="vendor-card">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <h2>Personal Information</h2>
                      <p>Full name: <span>{user?.name}</span></p>
                      <p>Email Address: <span>{user?.email}</span></p>
                      <p>Phone number: <span>{user?.phone}</span></p>
                      <p>Address: 
                        {user?.address?.map((addr, index) => (
                          <div key={index}><span>{addr}</span></div>
                        ))}
                      </p>
                      <p>Verified: <span>{user?.isVerified ? "Yes" : "No"}</span></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <h2>Booking History ({user?.bookings?.length} bookings)</h2>
                      {user?.bookings?.map((booking, index) => (
                        <div key={index} className="booking-item" style={{ marginBottom: '10px' }}>
                          <p>Booking {index + 1}:</p>
                          <p>Tour Title: <span>{booking?.tour?.title?.en}</span></p>
                          <p>Tour Date: <span>{new Date(booking.tour_date).toLocaleDateString()}</span></p>
                          <Button onClick={() => handleModalOpen(booking)}>View Booking {index + 1} Details</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Modal for displaying booking details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalData && (
              <>
                <p>Booking Date: <span>{new Date(modalData.booking_date).toLocaleDateString()}</span></p>
                <p>Tour Title: <span>{modalData?.tour?.title?.en}</span></p>
                <p>Total Price: <span>{modalData.total_price}</span></p>
                <p>Payment Status: <span>{modalData.payment_status}</span></p>
                <h3>Rooms Booked:</h3>
                {modalData?.rooms_booked?.map((room, index) => (
                  <div key={index}>
                    <p>Room Type: <span>{room.room_type}</span></p>
                    <p>Quantity: <span>{room.quantity}</span></p>
                    <p>Price: <span>{room.price}</span></p>
                  </div>
                ))}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Admin_Users_details;
