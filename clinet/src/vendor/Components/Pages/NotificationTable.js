import React, { useState, useEffect } from "react";
import "../Assets/Css/Table.css";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from 'react-query';
import { deleteAdmin } from '../../../services/apiservices/VendorService';
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
import axios from "axios";
import Cookies from 'js-cookie';

function NotificationTable({ path, dataToDisplay }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Mutation to delete vendor
  const deleteMutation = useMutation(deleteAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete vendor.', 'error');
    }
  });

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin); // Set the admin data
    onOpen(true); // Open the modal (if using `isOpen` state for modal visibility)
  };

  const updateAdmin = async () => {
    try {
      const response = await axios.patch(`http://185.170.198.81/api/admin/${selectedAdmin._id}`,
        {
          name: selectedAdmin.name,
          email: selectedAdmin.email,
          password: selectedAdmin.password, // Optional: Include only if updating password
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('tokenadmin')}`,
            'Content-Type': 'application/json', 
            role: 'admin',
          },
        });
      if (response.status === 200) {
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.map((admin, index) => (
            <tr key={index}>
              <td>
                {admin._id}
              </td>
              <td>{admin?.name}</td>
              <td>{admin?.email}</td>
              <td>
                <div className="action">
                  <a href="#!" className="delete" onClick={() => handleDeleteClick(admin._id)}>
                    <i className="fa fa-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Admin</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <div className="row">
        <div className="col-md-6">
          <p>Name</p>
          <Input
            type="text"
            name="name"
            placeholder="Enter new name"
            value={selectedAdmin?.name || ''}
            onChange={(e) =>
              setSelectedAdmin((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="col-md-6">
          <p>Email</p>
          <Input
            type="email"
            name="email"
            placeholder="Enter new email"
            value={selectedAdmin?.email || ''}
            onChange={(e) =>
              setSelectedAdmin((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="col-md-6">
          <p>Password</p>
          <Input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={selectedAdmin?.password || ''}
            onChange={(e) =>
              setSelectedAdmin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button colorScheme="blue" onClick={updateAdmin}>Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </>
  );
}

export default NotificationTable;
