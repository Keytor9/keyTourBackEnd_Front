import React, { useState } from "react";
import "../Assets/Css/Table.css";
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
import UpdateTour from "../../Components/Pages/UpdateTour"; // Import the UpdateTour component
import { resendTourRequest,deleteTour } from '../../../services/apiservices/TourService'; 
import { Link, NavLink, useNavigate } from "react-router-dom";
function Table({ dataToDisplay, path,onTourDeleted  }) {
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isResending, setIsResending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const openModal = (tour) => {
    setSelectedTour(tour); // Set the selected tour for updating
    onOpen(); // Open the modal
  };
  const handleResend = async (tourId) => {
    setIsResending(true);
    try {
      await resendTourRequest(tourId); // Call the resend API
      alert('Tour request has been resent and status set to pending');
    } catch (error) {
      alert(`Failed to resend tour: ${error.message}`);
    } finally {
      setIsResending(false);
    }
  };
  const handleRowClick = (id) => {
    navigate(`/tourdetails/${id}`);
  };
  const handleDelete = async (tourId) => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this tour?");
    if (confirmDeletion) {
      setIsDeleting(true);
      try {
        await deleteTour(tourId); // Call the delete API
        alert('Tour deleted successfully');
        if (onTourDeleted) {
          onTourDeleted(tourId); // Optional callback to refresh data after deletion
        }
      } catch (error) {
        alert(`Failed to delete tour: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };
  return (
    <>
      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Tour Title</th>
              <th>Tour Type</th>
              <th>Status</th>
              <th>From</th>
              <th>To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((tour) => (
              <tr key={tour._id}>
                <td>
                  <Link to={`/tourdetails/${tour._id}`}>{tour.title}</Link>
                </td>
                <td>{tour.tour_type}</td>
                {/* <td>
                  <div className={tour.status}>
                    <div className="dot"></div>
                    <span>{tour.status}</span>
                  </div>
                </td> */}
                <td>
                <div className={tour.status}>
                  <div className="dot"></div>
                  <span>{tour.status}</span>
                </div>
              </td>
                <td>{new Date(tour.availability.from).toLocaleDateString()}</td>
                <td>{new Date(tour.availability.to).toLocaleDateString()}</td>
                <td>
                  <div className="action">
                    {tour.status == "rejected" && tour.resend == false ? (
                      <a
                        href="#!"
                        className="edit"
                        onClick={() => handleResend(tour._id)}
                        disabled={isResending}
                      >
                        {isResending ? <i class="fa-solid fa-paper-plane"></i>: <i class="fa-solid fa-paper-plane"></i>}
                      </a>
                    ) : null}
                  <a onClick={() => openModal(tour)} href="#!" className="edit">
                      <i className="fa fa-pen"></i>
                    </a>

                    <a onClick={() => handleDelete(tour._id)}
                      disabled={isDeleting}  className="delete">
                      <i className="fa fa-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>

      {/* Modal for Updating Tour */}
      {selectedTour && (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Tour</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateTour tour={selectedTour} /> {/* Pass selected tour to UpdateTour */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Table;
