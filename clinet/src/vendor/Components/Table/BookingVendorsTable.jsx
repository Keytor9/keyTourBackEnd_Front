import React, { useState } from "react";
import "../Assets/Css/Table.css";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Box, Table as ChakraTable, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function BookingVendorsTable({ path, dataToDisplay }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  // Function to handle row click and open modal
  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    onOpen();
  };

  // console.log(selectedBooking[0].tour_type);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tour ID</th>
            <th>Payment status</th>
            <th>Destination</th>
            {/* <th>Vendor</th> */}
            <th>Date</th>
            <th>Username</th>
            <th>Phone</th>

            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.map((user, index) => (
            <tr key={index} onClick={() => navigate(`/Vendor_Booking_details/${user._id}`)}>
              <td>{user._id}</td>
              <td>{user?.tour?.id}</td>
              <td>{user.paymentStatus}</td>
              <td>{user?.tour?.destination?.country?.en || "N/A"}</td>
              {/* <td>{user?.vendor?.name}</td> */}
              <td>{new Date(user.bookingDate).toLocaleDateString()}</td>
              <td>{user?.user?.name || "N/A"}</td>
              <td>{user?.user?.phone || "N/A"}</td>

              <td>{user?.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for showing detailed information */}
      {selectedBooking && (
        <Modal isOpen={isOpen} onClose={onClose} size="xxl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Booking Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <div className="row">
              
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">Username:</Text>
                <Text>{selectedBooking.user.name}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">User Phone Number:</Text>
                <Text>{selectedBooking?.user?.phone}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">startDate:</Text>
                <Text>{new Date(selectedBooking.startDate).toLocaleDateString()}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">endDate:</Text>
                <Text>{new Date(selectedBooking.endDate).toLocaleDateString()}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">Number Of Adults:</Text>
                <Text>{selectedBooking?.numberOfAdults}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">Number Of Children:</Text>
                <Text>{selectedBooking?.numberOfChildren}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">Payment Status:</Text>
                <Text>{selectedBooking.paymentStatus}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">Language:</Text>
                <Text>{selectedBooking.language}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">Total Price:</Text>
                <Text>{selectedBooking.totalPrice}</Text>
              </Box>
            </div>
            <div className="col-md-6">
              <Box mb={4}>
                <Text fontWeight="bold">Booking Date:</Text>
                <Text>{new Date(selectedBooking.bookingDate).toLocaleDateString()}</Text>
              </Box>
            </div>
            {/* <div className="col-md-6">
              <img src={`http://185.170.198.81/api/${selectedBooking.tour?.image}`} alt="logo" width={80} height={80} />
            </div> */}
            <div className="col-md-6">
              <Box mb={4} className="d-block">
                <Text fontWeight="bold">Room Details:</Text>
                {selectedBooking.tour.tour_type == "multi-day" ?
                selectedBooking.rooms.map((room, idx) => (
                  <Text key={idx}>
                    Number Of Rooms: {room.quantity},<br /> Room Type: {room.roomType},<br /> Total Price: {room.pricePerRoom}
                  </Text>
                )) : selectedBooking.rooms.map((room, idx) => (
                  <Text key={idx}>
                    Number Of {room.roomType}: {room.quantity},<br /> Total Price: {room.pricePerRoom}
                  </Text>
                )) }
              </Box>
            </div>
            </div>
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

export default BookingVendorsTable;
