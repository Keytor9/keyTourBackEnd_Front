import React from "react";
import "../Assets/Css/Table.css";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from 'react-query';
import { blockUser } from '../../../services/apiservices/VendorService';
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

function TableUsers({ path, dataToDisplay }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  
  // Mutation to delete vendor
  const blockMutation = useMutation(blockUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('vendors'); // Refetch vendors
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete vendor.', 'error');
    }
  });

  
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
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.map((user, index) => (
            <tr key={index}>
              <td onClick={() => navigate(`/${path}/${user._id}`)}>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.join(', ')}</td>
              <td>{user.isVerified ? "Yes" : "No"}</td>
              <td>
                <div className="action">
                  {/* <a href="#!" className="edit">
                    <i className="fa fa-pen"></i>
                  </a> */}
                  <a href="#!" className="delete">
                    <i className="fa fa-trash"></i>
                  </a>
                  <a href="#!" className="edit" onClick={() => handleBlockClick(user._id)}>
                    <i className={user.isBlocked == false ? "fa fa-ban" : "fa fa-unlock"}></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableUsers;
