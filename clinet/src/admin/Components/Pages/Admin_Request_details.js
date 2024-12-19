import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import moment from 'moment';
import Swal from "sweetalert2";
import KeyTours from "../../../loadingspinner/KeyTours";
import { getTourById, updateTourStatus } from '../../../services/apiservices/TourService';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Button, useDisclosure
} from '@chakra-ui/react';
import Api from '../../../services/api';

function Admin_Requests_details() {
  const { id: currentPath } = useParams(); // Get the id from the route params
  const navigate = useNavigate();

  const { data: tourData, error, isLoading } = useQuery(
    ["tour", currentPath],
    () => getTourById(currentPath)
  );

  const [status, setStatus] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState(null); // To track which action is being confirmed (accept/reject)

  const tour = tourData?.data;
  const adultRoom = tour?.room_types.find(room => room.name === 'adult');
  const originalPrice = adultRoom ? adultRoom.netprice : 0;
  useEffect(() => {
    if (tourData) {
      setStatus(tourData?.data?.status);
    }
  }, [tourData]);

  // Mutation for updating the tour status
  const mutation = useMutation(
    (newStatus) => updateTourStatus(currentPath, newStatus),
    {
      onSuccess: (data) => {
        setStatus(data.data.status);
        onClose();
        Swal.fire('Success!', `Tour has been ${action}`, 'success');
        navigate("/Admin_Requests")
      },
      onError: (error) => {
        Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
      },
    }
  );

  const handleConfirmAction = () => {
    if (action) {
      mutation.mutate(action);
    }
  };

  const handleActionClick = (newStatus) => {
    setAction(newStatus);
    onOpen();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  

  if (isLoading) return <KeyTours />;

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    return null;
  }


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
                Dashboard / Requests / <span>Request details</span>
              </h2>
              <div className="requests-status">
                <h2>
                  Tour ID <span>{tour?.id}</span>
                </h2>
                <h2>
                  Vendor Name <span>{tour?.vendor?.name}</span>
                </h2>
                <div className="d-flex align-items-center">
                  {status === 'pending' && (
                    <>
                      <button className="request-reject" onClick={() => handleActionClick('rejected')}>Reject</button>
                      <button className="request-approve" onClick={() => handleActionClick('accepted')}>Confirm</button>
                    </>
                  )}
                  {status === 'accepted' && <button className="request-reject" onClick={() => handleActionClick('rejected')}>Reject</button>}
                  {status === 'rejected' && <button className="request-approve" onClick={() => handleActionClick('accepted')}>Confirm</button>}
                </div>
              </div>

              {/* Confirmation Modal */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Confirm Action</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Are you sure you want to {action === 'accepted' ? 'accept' : 'reject'} this tour?
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button colorScheme="blue" onClick={handleConfirmAction}>Confirm</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <form  className='add-new-tour'>
                <div className="row">
                
                {tour?.status === "accepted" ? 
                  <>
                    <div className="col-md-12">
                      <div className="d-flex justify-content-between align-items-center text-center w-100">
                        <div>
                          <label>Total Bookings</label>
                          <h2>{tour?.bookingsDataa?.totalBookings}</h2>
                        </div>
                        <div>
                          <label>Confirmed Bookings</label>
                          <h2>{tour?.bookingsDataa?.confirmedBookings}</h2>
                        </div>
                        <div>
                          <label>Canceled Bookings</label>
                          <h2>{tour?.bookingsDataa?.canceledBookings}</h2>
                        </div>
                        <div>
                          <label>Pending Bookings</label>
                          <h2>{tour?.bookingsDataa?.pendingBookings}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="d-flex justify-content-between align-items-center text-center w-100 mt-3 mb-3">
                        <div>
                          <label>Total Revenue</label>
                          <h2>{tour?.bookingsDataa?.totalRevenue}</h2>
                        </div>
                        <div>
                          <label>Key tour Revenue</label>
                          <h2>{tour?.bookingsDataa?.adminRevenue}</h2>
                        </div>
                        <div>
                          <label>Vendor Revenue</label>
                          <h2>{tour?.bookingsDataa?.vendorRevenue}</h2>
                        </div>
                      </div>
                    </div>
                  </>
                  : "" }
                  <div className="col-md-6 mb-5 h-100">
                    <img
                      src={`${Api}/${tour?.image}`}
                      alt="Requests"
                      className="Requests-img"
                    />
                    <div className="slider">
                      {tour?.imagesthubnails?.map((thumbnail, index) => (
                        <div key={index} className="slide">
                          <img src={`${Api}/${thumbnail}`} alt={`Thumbnail ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Tour Title</label>
                          <input
                            type="text"
                            name="title"
                            defaultValue={tour?.title}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Destination</label>
                          <input
                            type="text"
                            name="Destination"
                            defaultValue={tour?.destination?.country?.en}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Program availability</label>
                          <input
                            type="text"
                            name="availability"
                            defaultValue={`From: ${formatDate(tour?.availability?.from)} To: ${formatDate(tour?.availability?.to)}`}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tour type</label>
                          <input
                            type="text"
                            name="type"
                            defaultValue={tour?.tour_type}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tour language</label>
                          <input
                            type="text"
                            name="language"
                            defaultValue={tour?.languages?.join(', ')}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Program</label>
                          <input
                            type="text"
                            name="Program"
                            defaultValue={`${tour?.programdays} days`}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Availability</label>
                          <div className="d-flex justify-content-between">
                            <h3>
                              From: <span>{formatDate(tour?.availability?.from)}</span>
                            </h3>
                            <h3>
                              To: <span>{formatDate(tour?.availability?.to)}</span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tour brief</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={tour?.brief}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-6">
                      <div className="row">
                        {tour?.room_types.map((x , index) => (
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Name</label>
                                <input
                                  type="text"
                                  name=""
                                  defaultValue={x.name}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Adult</label>
                                    <input
                                      type="text"
                                      name=""
                                      defaultValue={x.occupancyadult}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Children</label>
                                    <input
                                      type="text"
                                      name=""
                                      defaultValue={x.occupancychildern}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Net Price</label>
                                    <input
                                      type="text"
                                      name=""
                                      defaultValue={x.netprice}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Price</label>
                                    <input
                                      type="text"
                                      name=""
                                      defaultValue={x.price}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>
                  {/* <div className="col-md-6">
                    <label>Room Types</label>
                    <div className="row">
                          <div className="row">
                            <div className="col-md-6" >
                              <div className="form-group">
                                <label>Shared</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue={tour.shared}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label> - Private</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue={tour.private}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Inclusion:</label>
                        <ul>
                          {tour?.includes?.map((item, index) => (
                            <li key={index}>{item} / {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <label>Exclusion:</label>
                        <ul>
                          {tour?.excludes?.map((item, index) => (
                            <li key={index}>{item} / {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-6 mt-5">
                        <label>Note</label>
                        <h2>{tour?.cancellation_policy}</h2>
                        {/* <h2>{tour?.cancellation_policy?.ar}</h2> */}
                      </div>
                      <div className="col-md-6 mt-5">
                          <label>Availability To Cancel</label>
                          <h2>{tour?.availabilityToCancel}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-5">
                  {tour?.tour_type !== "multi-day" && tour?.room_types !== "multi-day" ?
                  <>
                    {tour?.discounts && tour?.discounts.length > 0 && (
                      <>
                        <h5>Discounts : </h5>
                        <div className="row">
                          {tour.discounts.map((discount, index) => (
                            <div key={index} className="col-md-6">
                              <div className="form-group">
                                <label>Minimum Users</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={discount.min_users}
                                  readOnly
                                />
                              </div>
                              <div className="form-group">
                                <label>Discount Price</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={originalPrice - Math.round(originalPrice * discount.discount_percentage / 100)}
                                  readOnly
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                    : ""}
                  </div>
                  <div className="col-md-12 mt-5">
                    <label>Available Days</label>
                    {tour?.AvailabilityDays?.map((x, index) => (
                      <div key={index}>
                        <div className="row">
                          <div className="col-md-3">
                            <label>Day</label>
                            <h2>{moment(x.dates[0]).format('DD/MM/YYYY')}</h2>
                          </div>
                          <div className="col-md-9">
                            {x?.room_types.map((x , index) => (
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label>Name</label>
                                    <input
                                      type="text"
                                      name=""
                                      defaultValue={x.name}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Adult</label>
                                        <input
                                          type="text"
                                          name=""
                                          defaultValue={x.occupancyadult}
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Children</label>
                                        <input
                                          type="text"
                                          name=""
                                          defaultValue={x.occupancychildren}
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Net Price</label>
                                        <input
                                          type="text"
                                          name=""
                                          defaultValue={x.netprice}
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Price</label>
                                        <input
                                          type="text"
                                          name=""
                                          defaultValue={x.price}
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {tour?.tour_type !== "multi-day" && tour?.room_types !== "multi-day" ?
                              <div className="col-md-6">
                                {x?.discounts && x?.discounts.length > 0 && (
                                  <>
                                    <h5>Discounts : </h5>
                                    <div className="row">
                                      {x.discounts.map((discount, index) => (
                                        <div key={index} className="col-md-6">
                                          <div className="form-group">
                                            <label>Minimum Users</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={discount.min_users}
                                              readOnly
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label>Discount Price</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={originalPrice - Math.round(originalPrice * discount.discount_percentage / 100)}
                                              readOnly
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            : ""}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin_Requests_details;