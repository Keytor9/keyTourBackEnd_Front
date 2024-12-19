import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import edit from "../Assets/img/edit.png";
import Footer from "../Footer/Footer";
import Cookies from 'js-cookie';
import Requests from "../Assets/img/Icon (3).png";
import Tours from "../Assets/img/Icon (7).png";
import Vendors from "../Assets/img/Icon (8).png";
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { updateVendor, getVendorById } from '../../../services/apiservices/VendorService';import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
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

function Vendor_Profile() {
  const token = Cookies.get('uservendor');
  const parsedData = JSON.parse(token);
  const name = parsedData.name;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const updateMutation = useMutation((vendorData) => updateVendor(parsedData._id, vendorData), {
    onSuccess: () => {
      queryClient.invalidateQueries('vendors'); // Refetch vendors
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to update vendor.', 'error');
    }
  });

  // Fetch vendor details using React Query
  const { data: vendorData, isLoading, error } = useQuery(
    ['vendor', parsedData._id],
    () => getVendorById(parsedData._id)
  );
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  // Update formData once vendorData is loaded
  useEffect(() => {
    if (vendorData?.data) {
      setFormData({
        name: vendorData.data.name || '',
        email: vendorData.data.email || '',
        password: vendorData.data.password || '',
        phone: vendorData.data.phone || ''
      });
    }
  }, [vendorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdateClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        updateMutation.mutate(formData); // Send updated data
        Swal.fire('Update!', 'Vendor has been updated.', 'success');
      }
    });
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
                Dashboard / <span>Profile</span>
              </h2>
              <div className="vendor-card">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <h2>
                        Personal Information{" "}
                        <a href="#!" className="profile-information">
                          <img src={edit} alt="edit" />
                        </a>
                      </h2>
                      <p>
        Full name:
        <input
          name="name"
          className="form-control"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </p>
      <p>
        Email Address:
        <input
          name="email"
          className="form-control"
          placeholder="Your email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </p>
      <p>
        Phone number:
        <input
          name="phone"
          type="number"
          className="form-control"
          placeholder="Your phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <h2>Account settings</h2>
                      <p className="d-flex justify-content-between algin-items-center">
                        Change Password
                        <a href="#!" className="profile-information">
                          <img src={edit} alt="edit" />
                        </a>
                      </p>
                      <input name="password" type="password" className="form-control mb-3" placeholder="Your New Password" value={formData.password} />
                      <p>Notification preferences</p>
                      <p>Language preferences</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="d-flex align-items-center mt-5">
                      <button className="request-approve" onClick={() => handleUpdateClick(parsedData._id)}>Save changes</button>
                      <button className="request-reject">Reset</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Vendor_Profile;
