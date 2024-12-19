import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAllDestinations, createDestination, updateDestination, deleteDestination } from '../../../services/apiservices/DestinationService';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

function Admin_Attributes() {
  const queryClient = useQueryClient();
  const { data: destinations, isLoading, error } = useQuery('destinations', getAllDestinations);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [countryEn, setCountryEn] = useState("");
  const [countryAr, setCountryAr] = useState("");
  const [image, setImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Mutations for CRUD operations
  const createMutation = useMutation(createDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries('destinations');
      onClose();
    }
  });

  const updateMutation = useMutation(updateDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries('destinations');
      onClose();
    }
  });

  const deleteMutation = useMutation(deleteDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries('destinations');
    }
  });

  const handleAddClick = () => {
    setSelectedDestination(null);
    setCountryEn("");
    setCountryAr("");
    setImage(null);
    onOpen();
  };

const [errors, setErrors] = useState({});

  const handleEditClick = (destination) => {
    setSelectedDestination(destination);
    setCountryEn(destination.country.en);
    setCountryAr(destination.country.ar);
    setImage(null); // Reset image as it should be re-uploaded if changed
    onOpen();
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire('Deleted!', 'Your destination has been deleted.', 'success');
      }
    });
  };

  const handleSave = () => {
    const newErrors = {};
  
    // Validate fields
    if (!countryEn) newErrors.countryEn = 'Country name (English) is required.';
    if (!countryAr) newErrors.countryAr = 'Country name (Arabic) is required.';
    if (!image && !selectedDestination) {
      newErrors.image = 'Image is required.';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop if there are validation errors
    }
  
    const destinationData = new FormData();
    destinationData.append('country[en]', countryEn);
    destinationData.append('country[ar]', countryAr);
    if (image) {
      destinationData.append('image', image);
    }
  
    if (selectedDestination) {
      updateMutation.mutate({ id: selectedDestination._id, data: destinationData });
    } else {
      createMutation.mutate(destinationData);
    }
  
    // Clear errors after successful save
    setErrors({});
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
            <div className="att-card">
              <h2>Tour Types</h2>
              <div className="d-flex">
                <h3>Single day tour</h3>
                <h3>Transfer</h3>
                {/* <h3>Activity</h3> */}
                <h3>Multi day tour</h3>
              </div>
            </div>
            <div className="att-card">
              <h2 className="d-flex justify-content-between">
                Destinations
                <a href="#!" className="att-add" onClick={handleAddClick}>
                  <i className="fa fa-plus"></i>
                </a>
              </h2>
              <div className="d-flex">
                {destinations?.data?.map((destination) => (
                  <h3 key={destination._id}>
                    {destination.country.en}
                    <div className="ms-3 d-flex">
                      <a href="#!" className="att-edit" onClick={() => handleEditClick(destination)}>
                        <i className="fa fa-pen"></i>
                      </a>
                      <a href="#!" className="att-delete" onClick={() => handleDeleteClick(destination._id)}>
                        <i className="fa fa-trash"></i>
                      </a>
                    </div>
                  </h3>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{selectedDestination ? "Edit Destination" : "Add Destination"}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <FormControl mb={4} isInvalid={!!errors.countryEn}>
        <FormLabel>Country Name (English)</FormLabel>
        <Input
          placeholder="Enter country name in English"
          value={countryEn}
          onChange={(e) => setCountryEn(e.target.value)}
        />
        {errors.countryEn && <p className="des-error">{errors.countryEn}</p>}
      </FormControl>
      <FormControl mb={4} isInvalid={!!errors.countryAr}>
        <FormLabel>Country Name (Arabic)</FormLabel>
        <Input
          placeholder="Enter country name in Arabic"
          value={countryAr}
          onChange={(e) => setCountryAr(e.target.value)}
        />
        {errors.countryAr && <p className="des-error">{errors.countryAr}</p>}
      </FormControl>
      <FormControl mb={4} isInvalid={!!errors.image}>
        <FormLabel>Image</FormLabel>
        <Input type="file" onChange={handleImageChange} />
        {errors.image && <p className="des-error">{errors.image}</p>}
      </FormControl>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" onClick={handleSave}>
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  );
}

export default Admin_Attributes;
