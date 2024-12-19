import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

function ReviewTable({ dataToDisplay }) {
  const [selectedReview, setSelectedReview] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (review) => {
    setSelectedReview(review);
    onOpen();
  };

  return (
    <>
      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Phone</th>
              <th>Tour Title</th>
              <th>Vendor</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay?.data?.map((review) => (
              <tr key={review._id} onClick={() => openModal(review)}>
                <td>{review.user.name}</td>
                <td>{review.user.phone}</td>
                <td>{review.tour.title}</td>
                <td>{review.vendor.name}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>
                  <button onClick={() => openModal(review)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReview && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Review Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h2><strong>User:</strong> {selectedReview.user.name}</h2>
              <p><strong>Phone:</strong> {selectedReview.user.phone}</p>
              <p><strong>Tour Title:</strong> {selectedReview.tour.title.en}</p>
              <p><strong>Tour Brief:</strong> {selectedReview.tour.brief.en}</p>
              <p><strong>Rating:</strong> {selectedReview.rating}</p>
              <p><strong>Comment:</strong> {selectedReview.comment}</p>
              <h3>Booking Details</h3>
              {selectedReview.user.bookings.map((booking) => (
                <div key={booking._id}>
                  <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p><strong>Total Price:</strong> {booking.totalPrice}</p>
                  <p><strong>Number of Adults:</strong> {booking.numberOfAdults}</p>
                  <p><strong>Number of Children:</strong> {booking.numberOfChildren}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                </div>
              ))}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ReviewTable;
