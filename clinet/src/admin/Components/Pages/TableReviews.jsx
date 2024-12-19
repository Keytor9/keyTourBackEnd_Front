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
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function TableReviews({ dataToDisplay }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState(null); // To store data for modal display

  const handleOpenModal = (data) => {
    setModalData(data); // Set the data to display in modal
    onOpen(); // Open the modal
  };

  return (
    <>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Tour Title</Th>
            <Th>Destination</Th>
            <Th>Vendor</Th>
            <Th>Date</Th>
            <Th>Username</Th>
            <Th>Rating</Th>
            <Th>Comment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataToDisplay?.data?.map((review, index) => (
            <Tr key={index}>
              <Td>{review._id}</Td>

              {/* Tour Title (clickable) */}
              <Td
                style={{ cursor: review.tour ? "pointer" : "default" }}
                onClick={() =>
                  review.tour ? handleOpenModal({ type: "tour", data: review.tour }) : null
                }
              >
                {review.tour ? review.tour.title : "No Tour"}
              </Td>

              {/* Destination */}
              <Td>
                {review.tour
                  ? `${review.tour.destination.country.en}`
                  : "No Destination"}
              </Td>

              {/* Vendor (clickable) */}
              <Td
                style={{ cursor: review.vendor ? "pointer" : "default" }}
                onClick={() =>
                  review.vendor ? handleOpenModal({ type: "vendor", data: review.vendor }) : null
                }
              >
                {review.vendor ? review.vendor.name : "No Vendor"}
              </Td>

              {/* Created At */}
              <Td>{new Date(review.created_at).toLocaleString()}</Td>

              {/* Username (clickable) */}
              <Td
                style={{ cursor: review.user ? "pointer" : "default" }}
                onClick={() =>
                  review.user ? handleOpenModal({ type: "user", data: review.user }) : null
                }
              >
                {review.user ? review.user.name : "No User"}
              </Td>

              <Td>{review.rating}</Td>
              <Td>{review.comment}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for User, Vendor, and Tour */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalData?.type === "user" && "User Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalData?.type === "user" && (
              <div>
                <p><strong>Name:</strong> {modalData?.data.name}</p>
                <p><strong>Email:</strong> {modalData?.data.email}</p>
                <p><strong>Phone:</strong> {modalData?.data.phone}</p>
              </div>
            )}

            {modalData?.type === "vendor" && (
              <div>
                <p><strong>Vendor Name:</strong> {modalData?.data.name}</p>
                <p><strong>Email:</strong> {modalData?.data.email}</p>
              </div>
            )}

            {modalData?.type === "tour" && (
              <div>
                <p><strong>Tour Title:</strong> {modalData?.data.title}</p>
                <p><strong>Brief:</strong> {modalData?.data.brief}</p>
                <p><strong>Destination:</strong> {` ${modalData?.data.destination.country.en}`}</p>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TableReviews;
