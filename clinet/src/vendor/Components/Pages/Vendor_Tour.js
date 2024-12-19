import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

import Requests from "../Assets/img/Icon (3).png";
import Pending from "../Assets/img/Icon (4).png";
import Rejected from "../Assets/img/Icon (5).png";
import Confirmed from "../Assets/img/Icon (6).png";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import { useQuery } from 'react-query';
import { getvendorstour } from '../../../services/apiservices/TourService';
import KeyTours from "../../../loadingspinner/KeyTours";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import UpdateTour from "./UpdateTour";
function Vendor_Tour() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filter, setFilter] = useState("All"); 
  const [selectedTour, setSelectedTour] = useState(null); // State to track the tour being updated
  const { isOpen, onOpen, onClose } = useDisclosure()// State for filtering by status 
  const TOTAL_VALUES_PER_PAGE = 10;

  const { data: tours, error, isLoading } = useQuery('toursvendor', getvendorstour);

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  
  const goOnNextPage = () => {
    if (tours && currentPageNumber === Math.ceil(tours.data.length / TOTAL_VALUES_PER_PAGE)) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  const statusCounts = tours?.data?.reduce((counts, obj) => {
    counts[obj.status] = (counts[obj.status] || 0) + 1;
    counts.total = (counts.total || 0) + 1;
    return counts;
  }, {});



  // Function to paginate the tours data
  const paginateTours = (toursList) => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    return toursList.slice(start, end);
  };

  // Function to filter tours based on search term and filter status
  const filterTours = (toursList) => {
    let filtered = toursList;

    // Apply filter based on the selected status
    if (filter !== "All") {
      filtered = filtered.filter(tour => tour.status.toLowerCase() === filter.toLowerCase());
    }

    // Apply search term filtering
    if (searchTerm) {
      filtered = filtered.filter(tour => {
        const tourName = tour.title.en ? tour.title.en.toLowerCase() : "";
        return tourName.includes(searchTerm.toLowerCase());
      });
    }

    return filtered;
  };
  if (isLoading) return <KeyTours />;
  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </Box>
    );
  }

  const openUpdateModal = (tour) => {
    setSelectedTour(tour); // Set the selected tour
    onOpen(); // Open the modal
  };
  const filteredTours = filterTours(tours?.data || []);
  const paginatedTours = paginateTours(filteredTours);
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
              <div className="col-md-4">
                <div className="statistics">
                  <img src={Requests} alt="Requests" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{statusCounts.total}</h2>
                    <span>Total Requests</span>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="statistics">
                  <img src={Pending} alt="Pending" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{statusCounts.pending}</h2>
                    <span>Pending</span>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="statistics">
                  <img src={Rejected} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{!statusCounts?.rejected ? 0 : statusCounts?.rejected}</h2>
                    <span>Rejected</span>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="statistics">
                  <img src={Confirmed} alt="Confirmed" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{statusCounts?.accepted}</h2>
                    <span>Confirmed</span>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="statistics">
                  <img src={Rejected} alt="Confirmed" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{statusCounts?.cancelled}</h2>
                    <span>Cancelled</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-card">
              
              <div className="table-actions">
                <div className="table-filter">
                  <button className={`filter-button ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>All</button>
                  <button className={`filter-button ${filter === "Pending" ? "active" : ""}`} onClick={() => setFilter("Pending")}>Pending</button>
                  <button className={`filter-button ${filter === "Accepted" ? "active" : ""}`} onClick={() => setFilter("Accepted")}>Accepted</button>
                  <button className={`filter-button ${filter === "Rejected" ? "active" : ""}`} onClick={() => setFilter("Rejected")}>Rejected</button>
                  <button className={`filter-button ${filter === "Cancelled" ? "active" : ""}`} onClick={() => setFilter("Cancelled")}>Cancelled</button>
                </div>
                <div className="table-form">
                  <form id="table-search" className="table-search">
                    <div className="form-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
                        name="search"
                      />
                    </div>
                  </form>
                  <a href="#!" className="share">
                    <i className="fa fa-arrow-up-from-bracket"></i>
                  </a>
                </div>
              </div>
              <Table
                path="Admin_Requests_details"
                tour={tours?.data}
                dataToDisplay={paginatedTours}
              />

              <div className="table-pagination">
                <div id="btn-container" className="pagination">
                  <button onClick={goOnPrevPage} className="page-link"><i className="fa fa-arrow-left"></i></button>
                  <ul>
                    {Array.from(Array(Math.ceil(filteredTours.length / TOTAL_VALUES_PER_PAGE)))
                      .map((_, i) => i + 1)
                      .map((val) => (
                        <li
                          key={val}
                          className={val === currentPageNumber ? "page-link active" : "page-link"}
                        >
                          {val}
                        </li>
                      ))}
                  </ul>
                  <button onClick={goOnNextPage} className="page-link"><i className="fa fa-arrow-right"></i></button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Tour</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTour && <UpdateTour tour={selectedTour} />} {/* Pass selected tour to UpdateTour component */}
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

export default Vendor_Tour;
