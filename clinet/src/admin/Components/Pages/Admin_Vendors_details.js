// import React, { useState, useEffect, useRef } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import person from "../Assets/img/Rectangle 25.png";
// import Footer from "../Footer/Footer";

// function Admin_Vendors_details() {
//   return (
//     <>
//       <div className="main">
//         <div className="sidebar">
//           <Sidebar />
//         </div>
//         <div className="dev-table">
//           <Navbar />
//           <div className="content-card">
//             <div className="requests">
//               <h2>
//                 Vendors / <span>Vendors details</span>
//               </h2>
//               <div className="vendor-details">
//                 <div className="d-flex align-items-center">
//                   <img alt="person" src={person} className="Vendors-img" />
//                   <div>
//                     <h3>Bilal Ahmed Bekheit</h3>
//                     <h4>#22552252</h4>
//                   </div>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   <button className="request-reject">Reject</button>
//                   <button className="request-approve">Confirm</button>
//                 </div>
//               </div>
//               <div className="vendor-card">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div>
//                       <h2>Personal Information</h2>
//                       <p>
//                         Description:
//                         <span>
//                           Lorem ipsum dolor sit amet consectetur. Dui neque
//                           lorem ligula at faucibus varius egestas. Viverra
//                           tortor arcu quam enim at.
//                         </span>
//                       </p>
//                       <p>
//                         Full name:
//                         <span>Bilal Ahmed Bekheit</span>
//                       </p>
//                       <p>
//                         Email Address:
//                         <span>ahmedmohamed@company.com</span>
//                       </p>
//                       <p>
//                         Phone number:
//                         <span>+2010051541515</span>
//                       </p>
//                       <p>
//                         Company name:
//                         <span>Adzharia Company</span>
//                       </p>
//                       <p>
//                         Address:
//                         <span>Nasr city,cairo, Egypt</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div>
//                       <h2>Business Information</h2>
//                       <p>
//                         Business License Number: <span>12548425452154554</span>
//                       </p>
//                       <p>
//                         Tax Identification Number:
//                         <span>121548121511151515</span>
//                       </p>
//                     </div>
//                     <div>
//                       <h2>Bank Account</h2>
//                       <p>
//                         Bank: <span>CIB</span>
//                       </p>
//                       <p>
//                         Account number:
//                         <span>121548121511151515</span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Admin_Vendors_details;


















// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import person from "../Assets/img/Rectangle 25.png"; // Placeholder image
// import Footer from "../Footer/Footer";
// import { useParams } from "react-router";
// import { useQuery, useMutation } from 'react-query';
// import { getVendorById, updateVendorStatus } from '../../../services/apiservices/VendorService';
// import Swal from 'sweetalert2';
// import KeyTours from "../../../loadingspinner/KeyTours";
// import Api from '../../../services/api'

// function Admin_Vendors_details() {
//   const { id } = useParams(); // Get vendor ID from URL params

//   // Fetch vendor details using React Query
//   const { data: vendorData, isLoading, error } = useQuery(
//     ['vendor', id],
//     () => getVendorById(id)
//   );

//   const [status, setStatus] = useState(null);
//   const mutation = useMutation(updateVendorStatus, {
//     onSuccess: () => {
//       Swal.fire('Status updated!', 'The vendor status has been updated successfully.', 'success');
//     },
//     onError: () => {
//       Swal.fire('Error!', 'Something went wrong while updating the status.', 'error');
//     }
//   });

//   useEffect(() => {
//     if (vendorData) {
//       setStatus(vendorData?.status);
//     }
//   }, [vendorData]);

//   const handleStatusChange = (newStatus) => {
//     mutation.mutate({ id, status: newStatus });
//   };

//   if (isLoading) return <KeyTours />;
//   if (error) return <p>Error loading vendor details: {error.message}</p>;

//   const vendor = vendorData?.data;

//   return (
//     <>
//       <div className="main">
//         <div className="sidebar">
//           <Sidebar />
//         </div>
//         <div className="dev-table">
//           <Navbar />
//           <div className="content-card">
//             <div className="requests">
//               <h2>
//                 Vendors / <span>Vendor details</span>
//               </h2>
//               <div className="vendor-details">
//                 <div className="d-flex align-items-center">
//                   <img alt="person" src={`${Api}/${vendor?.image}` || person} className="Vendors-img" />
//                   <div>
//                     <h3>{vendor?.name}</h3>
//                     <h4>ID: {vendor?._id}</h4>
//                   </div>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   {status === "pending" && (
//                     <>
//                       <button className="request-reject" onClick={() => handleStatusChange("rejected")}>Reject</button>
//                       <button className="request-approve" onClick={() => handleStatusChange("accepted")}>Confirm</button>
//                     </>
//                   )}
//                   {status === "accepted" && (
//                     <button className="request-reject" onClick={() => handleStatusChange("rejected")}>Reject</button>
//                   )}
//                   {status === "rejected" && (
//                     <button className="request-approve" onClick={() => handleStatusChange("accepted")}>Confirm</button>
//                   )}
//                 </div>
//               </div>
//               <div className="vendor-card">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div>
//                       <h2>Personal Information</h2>
//                       <p>
//                         Full name:
//                         <span>{vendor?.name}</span>
//                       </p>
//                       <p>
//                         Email Address:
//                         <span>{vendor?.email}</span>
//                       </p>
//                       <p>
//                         Phone number:
//                         <span>{vendor?.phone}</span>
//                       </p>
//                       <p>
//                         Company name:
//                         <span>{vendor?.company_name}</span>
//                       </p>
//                       <p>
//                         Address:
//                         <span>{vendor?.company_address}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div>
//                       <h2>Business Information</h2>
//                       <p>
//                         Business License Number: 
//                         <span>{vendor?.business_license || 'N/A'}</span>
//                       </p>
//                       <p>
//                         Tax Identification Number: 
//                         <span>{vendor?.tax_id || 'N/A'}</span>
//                       </p>
//                       <p>
//                         Commission: 
//                         <span>{vendor?.commission}%</span>
//                       </p>
//                       <p>
//                         Status: 
//                         <span>{vendor?.status}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <h2>Bank Account</h2>
//                       <p>
//                         Bank: 
//                         <span>{vendor?.bank || 'N/A'}</span>
//                       </p>
//                       <p>
//                         Account number: 
//                         <span>{vendor?.bank_account || 'N/A'}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <h2>Dates</h2>
//                       <p>
//                         Created At: 
//                         <span>{new Date(vendor?.created_at).toLocaleDateString()}</span>
//                       </p>
//                       <p>
//                         Updated At: 
//                         <span>{new Date(vendor?.updated_at).toLocaleDateString()}</span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Admin_Vendors_details;


// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import person from "../Assets/img/Rectangle 25.png"; // Placeholder image
// import Footer from "../Footer/Footer";
// import { useParams } from "react-router";
// import { useQuery, useMutation } from 'react-query';
// import { getVendorById, updateVendorStatus } from '../../../services/apiservices/VendorService';
// import Swal from 'sweetalert2';
// import KeyTours from "../../../loadingspinner/KeyTours";
// import Api from '../../../services/api';

// function Admin_Vendors_details() {
//   const { id } = useParams(); // Get vendor ID from URL params

//   // Fetch vendor details using React Query
//   const { data: vendorData, isLoading, error } = useQuery(
//     ['vendor', id],
//     () => getVendorById(id)
//   );
// console.log(vendorData)
//   const [status, setStatus] = useState(null);
//   const mutation = useMutation(updateVendorStatus, {
//     onSuccess: () => {
//       Swal.fire('Status updated!', 'The vendor status has been updated successfully.', 'success');
//     },
//     onError: () => {
//       Swal.fire('Error!', 'Something went wrong while updating the status.', 'error');
//     }
//   });

//   useEffect(() => {
//     if (vendorData) {
//       setStatus(vendorData?.status);
//     }
//   }, [vendorData]);

//   const handleStatusChange = (newStatus) => {
//     mutation.mutate({ id, status: newStatus });
//   };

//   const downloadPDF = (url) => {
//     const link = document.createElement('a');
//     link.href = `${Api}/${url}`;
//     link.download = `file-${new Date().getTime()}.pdf`;
//     link.click();
//   };

//   if (isLoading) return <KeyTours />;
//   if (error) return <p>Error loading vendor details: {error.message}</p>;

//   const vendor = vendorData?.data;

//   return (
//     <>
//       <div className="main">
//         <div className="sidebar">
//           <Sidebar />
//         </div>
//         <div className="dev-table">
//           <Navbar />
//           <div className="content-card">
//             <div className="requests">
//               <h2>
//                 Vendors / <span>Vendor details</span>
//               </h2>
//               <div className="vendor-details">
//                 <div className="d-flex align-items-center">
//                   <img alt="person" src={`${Api}/${vendor?.image}` || person} className="Vendors-img" />
//                   <div>
//                     <h3>{vendor?.name}</h3>
//                     <h4>ID: {vendor?._id}</h4>
//                   </div>
//                 </div>
//                 <div className="d-flex align-items-center">
//                   {vendor?.status === "pending" && (
//                     <>
//                       <button className="request-reject" onClick={() => handleStatusChange("rejected")}>Reject</button>
//                       <button className="request-approve" onClick={() => handleStatusChange("accepted")}>Confirm</button>
//                     </>
//                   )}
//                   {vendor?.status === "accepted" && (
//                     <button className="request-reject" onClick={() => handleStatusChange("rejected")}>Reject</button>
//                   )}
//                   {vendor?.status === "rejected" && (
//                     <button className="request-approve" onClick={() => handleStatusChange("accepted")}>Confirm</button>
//                   )}
//                 </div>
//               </div>
//               <div className="vendor-card">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div>
//                       <h2>Personal Information</h2>
//                       <p>
//                         Full name:
//                         <span>{vendor?.name}</span>
//                       </p>
//                       <p>
//                         Email Address:
//                         <span>{vendor?.email}</span>
//                       </p>
//                       <p>
//                         Phone number:
//                         <span>{vendor?.phone}</span>
//                       </p>
//                       <p>
//                         Company name:
//                         <span>{vendor?.company_name}</span>
//                       </p>
//                       <p>
//                         Address:
//                         <span>{vendor?.company_address}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div>
//                       <h2>Business Information</h2>
//                       <p>
//                         Business License Number: 
//                         <span>{vendor?.business_license || 'N/A'}</span>
//                       </p>
//                       <p>
//                         Tax Identification Number: 
//                         <span>{vendor?.tax_id || 'N/A'}</span>
//                       </p>
//                       <p>
//                         Commission: 
//                         <span>{vendor?.commission}%</span>
//                       </p>
//                       <p>
//                         Status: 
//                         <span>{vendor?.status}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <h2>Bank Account</h2>
//                       <p>
//                         Bank: 
//                         <span>{vendor?.bank || 'N/A'}</span>
//                       </p>
//                       <p>
//                         Account number: 
//                         <span>{vendor?.bank_account || 'N/A'}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <h2>Dates</h2>
//                       <p>
//                         Created At: 
//                         <span>{new Date(vendor?.created_at).toLocaleDateString()}</span>
//                       </p>
//                       <p>
//                         Updated At: 
//                         <span>{new Date(vendor?.updated_at).toLocaleDateString()}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <h2>Download PDF Files</h2>
//                       <div>
//                         {vendor?.imagesthubnails?.map((file, index) => (
//                           <div key={index}>
//                             <button onClick={() => downloadPDF(file)}>
//                               Download File {index + 1}
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Admin_Vendors_details;
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import person from "../Assets/img/Rectangle 25.png"; // Placeholder image
import Footer from "../Footer/Footer";
import { Navigate, useNavigate, useParams } from "react-router";
import { useQuery, useMutation } from 'react-query';
import { getVendorById, updateVendorStatus } from '../../../services/apiservices/VendorService';
import Swal from 'sweetalert2';
import KeyTours from "../../../loadingspinner/KeyTours";
import Api from '../../../services/api';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';

function Admin_Vendors_details() {
  const { id } = useParams(); // Get vendor ID from URL params

  // Fetch vendor details using React Query
  const { data: vendorData, isLoading, error } = useQuery(
    ['vendor', id],
    () => getVendorById(id)
  );
  
  const [status, setStatus] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState(null); // Track which action is being confirmed (accept/reject)

  const mutation = useMutation(updateVendorStatus, {
    onSuccess: () => {
      Swal.fire('Status updated!', 'The vendor status has been updated successfully.', 'success');
      onClose();
      navigate("/Admin_Vendors")
    },
    onError: () => {
      Swal.fire('Error!', 'Something went wrong while updating the status.', 'error');
    }
  });

  useEffect(() => {
    if (vendorData) {
      setStatus(vendorData?.status);
    }
  }, [vendorData]);

  
  const navigate = useNavigate();

  const handleStatusChange = (newStatus) => {
    setAction(newStatus);
    onOpen(); // Open the confirmation modal
  };

  const confirmAction = () => {
    mutation.mutate({ id, status: action });
  };

  const downloadPDF = (url) => {
    const link = document.createElement('a');
    link.href = `${Api}/${url}`;
    link.download = `file-${new Date().getTime()}.pdf`;
    link.click();
  };

  if (isLoading) return <KeyTours />;
  if (error) return <p>Error loading vendor details: {error.message}</p>;

  const vendor = vendorData?.data;

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
                Vendors / <span>Vendor details</span>
              </h2>
              <div className="vendor-details">
                <div className="d-flex align-items-center">
                  <img alt="person" src={`${Api}/${vendor?.image}` || person} className="Vendors-img" />
                  <div>
                    <h3>{vendor?.name}</h3>
                    <h4>ID: {vendor?._id}</h4>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  {vendor?.status === "pending" && (
                    <>
                      <button className="request-reject" onClick={() => handleStatusChange("rejected")}>Reject</button>
                      <button className="request-approve" onClick={() => handleStatusChange("accepted")}>Confirm</button>
                    </>
                  )}
                  {vendor?.status === "accepted" && (
                    <button className="request-reject" onClick={() => handleStatusChange("rejected")}>Reject</button>
                  )}
                  {vendor?.status === "rejected" && (
                    <button className="request-approve" onClick={() => handleStatusChange("accepted")}>Confirm</button>
                  )}
                </div>
              </div>
              <div className="vendor-card">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <h2>Personal Information</h2>
                      <p>
                        Full name:
                        <span>{vendor?.name}</span>
                      </p>
                      <p>
                        Email Address:
                        <span>{vendor?.email}</span>
                      </p>
                      <p>
                        Phone number:
                        <span>{vendor?.phone}</span>
                      </p>
                      <p>
                        Company name:
                        <span>{vendor?.company_name}</span>
                      </p>
                      <p>
                        Address:
                        <span>{vendor?.company_address}</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <h2>Business Information</h2>
                      <p>
                        Business License Number: 
                        <span>{vendor?.business_license || 'N/A'}</span>
                      </p>
                      <p>
                        Tax Identification Number: 
                        <span>{vendor?.tax_id || 'N/A'}</span>
                      </p>
                      <p>
                        Commission: 
                        <span>{vendor?.commission}%</span>
                      </p>
                      <p>
                        Status: 
                        <span>{vendor?.status}</span>
                      </p>
                    </div>
                    <div>
                      <h2>Bank Account</h2>
                      <p>
                        Bank: 
                        <span>{vendor?.bank || 'N/A'}</span>
                      </p>
                      <p>
                        Account number: 
                        <span>{vendor?.bank_account || 'N/A'}</span>
                      </p>
                    </div>
                    <div>
                      <h2>Dates</h2>
                      <p>
                        Created At: 
                        <span>{new Date(vendor?.created_at).toLocaleDateString()}</span>
                      </p>
                      <p>
                        Updated At: 
                        <span>{new Date(vendor?.updated_at).toLocaleDateString()}</span>
                      </p>
                    </div>
                    <div>
                      <h2>Download PDF Files</h2>
                      <div>
                        {vendor?.imagesthubnails?.map((file, index) => (
                          <div key={index}>
                            <button onClick={() => downloadPDF(file)}>
                              Download File {index + 1}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h2>Tour Status Count</h2>
                      <div className="row">
                          <div className="col-md-4 mb-3 text-center">
                            <h3>Pending</h3>
                            <span>{vendor.tourStatusCount?.pending || 0}</span>
                          </div>
                          <div className="col-md-4 mb-3 text-center">
                            <h3>Accepted</h3>
                            <span>{vendor.tourStatusCount?.accepted || 0}</span>
                          </div>
                          <div className="col-md-4 mb-3 text-center">
                            <h3>Rejected</h3>
                            <span>{vendor.tourStatusCount?.rejected || 0}</span>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-12">
                    <h2 className="mt-4">Booking Status Count</h2>
                      <div className="row">
                          <div className="col-md-4 mb-3 text-center">
                            <h3>Pending</h3>
                            <span>{vendor.bookingStatusCount?.pending || 0}</span>
                          </div>
                          <div className="col-md-4 mb-3 text-center">
                            <h3>Confirmed</h3>
                            <span>{vendor.bookingStatusCount?.confirmed || 0}</span>
                          </div>
                          <div className="col-md-4 mb-3 text-center">
                            <h3>Canceled</h3>
                            <span>{vendor.bookingStatusCount?.cancelled || 0}</span>
                          </div>
                          <div className="col-md-4 mb-3 text-center">
                            <h3>Canceled By Vendor</h3>
                            <span>{vendor.bookingStatusCount?.canceledbyvendor || 0}</span>
                          </div>
                          <div className="col-md-4 mb-3 text-center">
                            <h3>Full Capacity</h3>
                            <span>{vendor.bookingStatusCount?.fullcapacity || 0}</span>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <h2 className="mt-4">Total Confirmed Revenue</h2>
                      <span>{vendor.totalConfirmedRevenue || 0} $</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to {action === 'accepted' ? 'accept' : 'reject'} this vendor?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={confirmAction}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Admin_Vendors_details;
