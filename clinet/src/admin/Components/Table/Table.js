// import React, { useState } from "react";
// import "../Assets/Css/Table.css";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// function Table(props) {
//     const navigate = useNavigate();
//     const goToPage = async (e) => {
//         navigate(`/${props.path}`);
//     };
//     const [item, setItem] = useState(props.path);
//     const [reqTour, setReqTour] = useState(props.dataToDisplay);
// console.log(props.tour)
    
    
//   return (
//     <>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Request ID</th>
//               <th>Tour Title</th>
//               <th>Submission Date</th>
//               <th>Status</th>
//               <th>Admin Comments</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//           {props.dataToDisplay?.map((x, index) => (
//             <tr key={index}>
//               <td id={x.id} 
//                 onClick={(e) => {
//                   navigate(`/${props.path}/${x.id}`, { state: { item: x.id } });
//                   console.log(item)
//                 }}
//               >{x.id}</td>
//               <td>{x.title.en}</td>
//               <td>{x.created_at}</td>
//               <td>
//                 <div className={x.status}>
//                   <div className="dot"></div>
//                   <span>{x.status}</span>
//                   {x.status == "pending" ? <div className="ms-3 d-flex">
//                     <a href="#!" className="pending-approve">
//                       <i className="fa fa-check"></i>
//                     </a>
//                     <a href="#!" className="pending-reject">
//                       <i className="fa fa-x"></i>
//                     </a>
//                   </div> : ""}
                  
//                 </div>
//               </td>
//               <td>{x.brief.en}</td>
//               <td>
//                 <div className="action">
//                   <a href="#!" className="edit">
//                     <i className="fa fa-pen"></i>
//                   </a>
//                   <a href="#!" className="delete">
//                     <i className="fa fa-trash"></i>
//                   </a>
//                 </div>
//               </td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
//     </>
//   );
// }

// export default Table;




// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../Assets/Css/Table.css";

// function Table({ path, dataToDisplay }) {
//   const navigate = useNavigate();

//   return (
//     <>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Request ID</th>
//             <th>Tour Title</th>
//             <th>Submission Date</th>
//             <th>Status</th>
//             <th>Admin Comments</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dataToDisplay?.map((tour, index) => (
//             <tr key={index}>
//               <td
//                 onClick={() =>
//                   navigate(`/Admin_Requests_details/${tour.id}`)
//                 }
//               >
//                 {tour.id}
//               </td>
//               <td>{tour.title.en}</td>
//               <td>{new Date(tour.created_at).toLocaleDateString()}</td>
//               <td>
//                 <div className={tour.status}>
//                   <div className="dot"></div>
//                   <span>{tour.status}</span>
//                   {tour.status === "pending" && (
//                     <div className="ms-3 d-flex">
//                       <a href="#!" className="pending-approve">
//                         <i className="fa fa-check"></i>
//                       </a>
//                       <a href="#!" className="pending-reject">
//                         <i className="fa fa-x"></i>
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               </td>
//               <td>{tour.brief.en}</td>
//               <td>
//                 <div className="action">
//                   <a href="#!" className="edit">
//                     <i className="fa fa-pen"></i>
//                   </a>
//                   <a href="#!" className="delete">
//                     <i className="fa fa-trash"></i>
//                   </a>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default Table;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { deleteTour } from '../../../services/apiservices/TourService';
import "../Assets/Css/Table.css";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import UpdateTour from "../Pages/UpdateTour";

function Table({ path, dataToDisplay }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { isOpen2, onOpen2, onClose2 } = useDisclosure();
  const [selectedTour, setSelectedTour] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false); // For Delete Modal
const [isUpdateOpen, setIsUpdateOpen] = React.useState(false); // For Update Modal


  const openModal2 = (tour) => {
    setSelectedTour(tour); // Set the selected tour for updating
    onOpen(); // Open the modal
  };

  const openDeleteModal = (tour) => {
    setSelectedTour(tour);
    setIsDeleteOpen(true);
  };
  
  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedTour(null);
  };
  
  const openUpdateModal = (tour) => {
    setSelectedTour(tour);
    setIsUpdateOpen(true);
  };
  
  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
    setSelectedTour(null);
  };
  

  // Mutation for deleting a tour
  const mutation = useMutation(
    (tourId) => deleteTour(tourId),
    {
      onSuccess: () => {
        Swal.fire('Deleted!', 'The tour has been deleted.', 'success');
        onClose();
        // Ideally, you would refetch the tours here or update the state to reflect the deletion.
      },
      onError: () => {
        Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
      },
    }
  );

  const handleDeleteClick = (tour) => {
    setSelectedTour(tour);
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedTour) {
      mutation.mutate(selectedTour.id);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Tour Title</th>
            <th>Vendor Name</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Edits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.map((tour, index) => (
            <tr key={index}>
              <td onClick={() => navigate(`/Admin_Requests_details/${tour?.id}`)}>{tour?.id}</td>
              <td>{tour.title}</td>
              <td>{tour.vendor.name}</td>
              <td>{new Date(tour.created_at).toLocaleDateString()}</td>
              <td>
                <div className={tour.status}>
                  <div className="dot"></div>
                  {tour.status == "cancelled" ? <span>Canceled By Vendor</span> : <span>{tour.status}</span>}
                </div>
              </td>
              <td>{tour.note}</td>
              <td>
                <div className="action">
                  {tour.cancelByVendor === true ? 
                    <a href="#!" className="edit" onClick={() => navigate(`/Admin_Cancel_details/${tour?.id}`)}>
                      <i className="fa fa-eye"></i>
                    </a> : ""}
                  <a href="#!" className="edit" onClick={() => openUpdateModal(tour)}>
                    <i className="fa fa-pen"></i>
                  </a>
                  <a href="#!" className="delete" onClick={() => openDeleteModal(tour)}>
                    <i className="fa fa-trash"></i>
                  </a>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this tour?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={closeDeleteModal}>Cancel</Button>
            <Button colorScheme="red" onClick={() => {
              handleConfirmDelete(selectedTour);
              closeDeleteModal(); // Close the modal after the action
            }}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Modal isOpen={isUpdateOpen} onClose={closeUpdateModal} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Tour</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTour && <UpdateTour tour={selectedTour} />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeUpdateModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Table;
