
import React, { useState } from "react";
import "../Assets/Css/Table.css";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from 'react-query';
import { updateVendorCommission, deleteVendor, blockVendor } from '../../../services/apiservices/VendorService';
import Swal from 'sweetalert2';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure
} from '@chakra-ui/react';

function TableVendor({ path, dataToDisplay }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [newCommission, setNewCommission] = useState("");

  // Mutation to update commission
  const updateMutation = useMutation(updateVendorCommission, {
    onSuccess: () => {
      queryClient.invalidateQueries('vendors'); // Refetch vendors
      onClose();
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to update commission.', 'error');
    }
  });

  // Mutation to delete vendor
  const deleteMutation = useMutation(deleteVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries('vendors'); // Refetch vendors
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete vendor.', 'error');
    }
  });

  // Mutation to delete vendor
  const blockMutation = useMutation(blockVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries('vendors'); // Refetch vendors
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete vendor.', 'error');
    }
  });

  // Handle edit icon click
  const handleEditClick = (vendor) => {
    setSelectedVendor(vendor);
    setNewCommission(vendor.commission); // Set initial commission value
    onOpen(); // Open the modal for editing commission
  };

  // Handle save after editing commission
  const handleSaveCommission = () => {
    if (selectedVendor) {
      updateMutation.mutate({
        id: selectedVendor._id,
        commission: newCommission
      });
    }
  };

  // Handle delete icon click
  const handleDeleteClick = (vendorId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(vendorId); // Delete the vendor
        Swal.fire('Deleted!', 'Vendor has been deleted.', 'success');
      }
    });
  };

  // Handle delete icon click
  const handleBlockClick = (vendorId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        blockMutation.mutate(vendorId); // Delete the vendor
        Swal.fire('Update!', 'Vendor has been Updated.', 'success');
      }
    });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company Name</th>
            <th>Status</th>
            <th>Commission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.map((vendor, index) => (
            <tr key={index}>
              <td onClick={() => navigate(`/${path}/${vendor._id}`)}>
                {vendor._id}
              </td>
              <td>{vendor.name}</td>
              <td>{vendor.email}</td>
              <td>{vendor.company_name}</td>
              <td>
                <div className={vendor.status}>
                  <div className="dot"></div>
                  <span>{vendor.status}</span>
                </div>
              </td>
              <td>{vendor.commission}%</td>
              <td>
                <div className="action">
                  <a href="#!" className="edit" onClick={() => handleEditClick(vendor)}>
                    <i className="fa fa-pen"></i>
                  </a>
                  <a href="#!" className="delete" onClick={() => handleDeleteClick(vendor._id)}>
                    <i className="fa fa-trash"></i>
                  </a>
                  <a href="#!" className="edit" onClick={() => handleBlockClick(vendor._id)}>
                    <i className={vendor.isBlocked == false ? "fa fa-ban" : "fa fa-unlock"}></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing commission */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Commission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Edit the commission for <strong>{selectedVendor?.name}</strong></p>
            <Input
              type="number"
              value={newCommission}
              onChange={(e) => setNewCommission(e.target.value)}
              placeholder="Enter new commission"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSaveCommission}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TableVendor;
