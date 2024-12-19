import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import moment from 'moment';
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import KeyTours from "../../../loadingspinner/KeyTours";
import { getTourById, updateTourStatus, cancelTour, fullyTour } from '../../../services/apiservices/TourService';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Button, useDisclosure
} from '@chakra-ui/react';
import Api from '../../../services/api';
import axios from "axios";
const predefinedRoomTypes = [
  { name: 'Single', occupancyadult: 1, occupancychildern: 0, netprice: 0 },
  { name: 'Double', occupancyadult: 2, occupancychildern: 0, netprice: 0 },
  { name: 'Triple', occupancyadult: 3, occupancychildern: 0, netprice: 0 },
  { name: 'Single+Child', occupancyadult: 1, occupancychildern: 1, netprice: 0 },
  { name: 'Double+Child', occupancyadult: 2, occupancychildern: 1, netprice: 0 },
  { name: 'Triple+Child', occupancyadult: 3, occupancychildern: 1, netprice: 0 },
];

function TourDetails() {
  const { id: currentPath } = useParams(); // Get the id from the route params
  const navigate = useNavigate();
  

  const { data: tourData, error, isLoading } = useQuery(
    ["tour", currentPath],
    () => getTourById(currentPath)
  );



  
  const tour = tourData?.data;

    
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [status, setStatus] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState(null); // To track which action is being confirmed (accept/reject)

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
      },
      onError: (error) => {
        Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
      },
    }
  );

  const deleteMutation = useMutation(
    ({ tourId, vendorId }) => cancelTour({ tourId, vendorId }), // Use correct API function
    {
      onSuccess: () => {
        onClose(); // Close modal or perform any cleanup
        Swal.fire('Canceled!', 'Tour has been deleted successfully.', 'success');
        navigate("/Vendor_Tour"); // Redirect after successful cancellation
      },
      onError: (error) => {
        Swal.fire('Error!', 'Failed to delete the tour. Please try again.', 'error');
      },
    }
  );

  const handleDelete = (e, tourId, vendorId) => {
    e.preventDefault(); // Prevent default action of the button click
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate({ tourId, vendorId }); // Pass both tourId and vendorId to mutation
      }
    });
  };

  const fullyMutation = useMutation(
    ({ tourId, vendorId }) => fullyTour({ tourId, vendorId }), // Use correct API function
    {
      onSuccess: () => {
        onClose(); // Close modal or perform any cleanup
        Swal.fire('Fully!', 'Tour has been Full Capacity successfully.', 'success');
        navigate("/Vendor_Tour"); // Redirect after successful cancellation
      },
      onError: (error) => {
        Swal.fire('Error!', 'Failed to Full Capacity the tour. Please try again.', 'error');
      },
    }
  );

  const handleFull = (e, tourId, vendorId) => {
    e.preventDefault(); // Prevent default action of the button click
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make it Full!',
    }).then((result) => {
      if (result.isConfirmed) {
        fullyMutation.mutate({ tourId, vendorId }); // Pass both tourId and vendorId to mutation
      }
    });
  };

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

  const [formData, setFormData] = useState({
      dates: [],
      room_types: [],
      discounts: [ 
          {
              min_users: 0,
              discount_percentage: 0
          }
      ],
  });
  const [selectedRoomType, setSelectedRoomType] = useState("");

  const handleRoomChange = (index, key, value) => {
      const updatedRoomTypes = formData.room_types.map((room, i) =>
        i === index ? { ...room, [key]: value } : room
      );
      setFormData({ ...formData, room_types: updatedRoomTypes });
    };

    const handleRoomTypeSelect = (e) => {
      const selectedType = predefinedRoomTypes.find(
        (room) => room.name === e.target.value
      );
      if (selectedType) {
        setFormData({
          ...formData,
          room_types: [...formData.room_types, { ...selectedType }],
        });
        setSelectedRoomType("");
      }
    };

    const addNewRoomType = () => {
      setFormData({
        ...formData,
        room_types: [
          ...formData.room_types,
          { name: '', occupancyadult: 0, occupancychildern: 0, netprice: 0 },
        ],
      });
    };

    const removeRoomType = (index) => {
      const updatedRoomTypes = formData.room_types.filter((_, i) => i !== index);
      setFormData({ ...formData, room_types: updatedRoomTypes });
    };

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages2, setSelectedImages2] = useState([]);
  const queryClient = useQueryClient();

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log(name , value)
  };

  const handleRoomTypeChange = (index, field, e) => {
    const updatedRoomTypes = [...formData.room_types];
    const updatedRoomType = { ...updatedRoomTypes[index] };
  
    // Update the roomType's netprice with the new value entered by the user
    const newNetPrice = parseFloat(e.target.value) || 0;
    updatedRoomType[field] = newNetPrice;
  
    // If discounted_price is not set, set it to netprice
    if (!updatedRoomType.discounted_price || updatedRoomType.discounted_price > newNetPrice) {
      updatedRoomType.discounted_price = newNetPrice;
    }
  
    // Calculate the discount percentage based on the new netprice and discounted price
    const discountPercentage = newNetPrice ? ((newNetPrice - updatedRoomType.discounted_price) / newNetPrice) * 100 : 0;
    updatedRoomType.discount_percentage = discountPercentage;
  
    updatedRoomTypes[index] = updatedRoomType;
    setFormData({
      ...formData,
      room_types: updatedRoomTypes,
    });
  };

useEffect(() => {
  if (tour?.tour_type != 'multi-day') {
      setFormData((prevFormData) => ({
          ...prevFormData,
          room_types: [
              { name: 'adult', netprice: 0, occupancychildern: 0, occupancyadult: 1 },
              { name: 'children', netprice: 0, occupancychildern: 1, occupancyadult: 0 }
          ],
      }));
  } else {
      setFormData((prevFormData) => ({
          ...prevFormData,
          room_types: [
          ],
      }));
  }
}, [formData.tour_type]);


const addAvailability = async (e) => {
  e.preventDefault();

  // Vendor data from cookies
  const vendorData = Cookies.get('uservendor') ? JSON.parse(Cookies.get('uservendor')) : null;

  if (!vendorData) {
    Swal.fire('Error', 'Vendor ID not found in cookies', 'error');
    return;
  }

  const token = Cookies.get('tokenvendor'); // Assuming an auth token is stored in cookies

  try {
    // Prepare JSON data
    const allDates = [...formData.dates];

    const jsonData = {
      tour: tour?.id,
      dates: allDates,
      room_types: formData.room_types.map((room) => ({
        name: room.name || '',
        netprice: room.netprice || 0,
        occupancychildren: room.occupancychildren || 0,
        occupancyadult: room.occupancyadult || 0,
      })),
      discounts: formData.discounts.map((discount) => ({
        min_users: discount.min_users || 0,
        discount_percentage: discount.discount_percentage || 0,
        discounted_price: discount.discounted_price || 0,
      })),
    };

    // Log the JSON data for debugging
    console.log('Payload:', JSON.stringify(jsonData, null, 2));

    const response = await axios.post(`${Api}/api/availbilty`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        role: 'vendor',
      },
    });

    Swal.fire('Success', 'Availability added successfully!', 'success');
    console.log('Response:', response.data);
    setTimeout(() => {
      // Navigate to another page
      window.location.reload();
      navigate(`/tourdetails/${response.data[0].tour}`); // Replace with your desired route
      // OR reload the current page
    }, []);
    return response.data;
  } catch (error) {
    console.error('Error:', error);

    if (error.response) {
      setTimeout(() => {
        Swal.fire('Error', error.response.data.message || 'An error occurred!', 'error');
      }, []);
    } else {
      Swal.fire('Error', 'Unable to process request. Please try again.', 'error');
    }
    throw error;
  }
};

const handlePriceChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const updateDiscountedPrices = (newNetPrice) => {
  const updatedDiscounts = formData.discounts.map((discount) => {
    // Ensure discounted price is not greater than the net price
    const discountPrice = discount.discounted_price > newNetPrice ? newNetPrice : discount.discounted_price;
    
    // Calculate discount percentage
    const discountPercentage = ((newNetPrice - discountPrice) / newNetPrice) * 100;

    return {
      ...discount,
      discounted_price: discountPrice,
      discount_percentage: discountPercentage,
    };
  });

  setFormData({
    ...formData,
    discounts: updatedDiscounts,
  });
};

const handleDiscountedPriceChange = (index, e) => {
  const updatedRoomTypes = [...formData.room_types];
  const updatedRoomType = { ...updatedRoomTypes[index] };

  // Set the discounted price value, ensuring it doesn't exceed netprice
  const newDiscountedPrice = parseFloat(e.target.value) || 0;
  
  if (newDiscountedPrice > updatedRoomType.netprice) {
    updatedRoomType.discounted_price = updatedRoomType.netprice; // Max discount price = net price
  } else {
    updatedRoomType.discounted_price = newDiscountedPrice;
  }

  // Calculate and update the discount percentage (if needed)
  updatedRoomType.discount_percentage = ((updatedRoomType.netprice - updatedRoomType.discounted_price) / updatedRoomType.netprice) * 100;

  updatedRoomTypes[index] = updatedRoomType;
  setFormData({
    ...formData,
    room_types: updatedRoomTypes,
  });
}; 

const handleDiscountChange = (index, field, value) => {
  setFormData(prevFormData => {
    const updatedDiscounts = [...prevFormData.discounts];
    const updatedDiscount = { ...updatedDiscounts[index] };

    // Find the "adult" room type for the discount at this index
    const adultRoomType = prevFormData.room_types.find(room => room.name === 'adult');
    const originalPrice = adultRoomType ? adultRoomType.netprice : 0; // Use the adult room's netprice

    if (field === 'discounted_price') {
      // Ensure the discounted price does not exceed the original net price
      const newDiscountedPrice = Math.min(parseFloat(value) || 0, originalPrice);
      updatedDiscount[field] = newDiscountedPrice;

      // Recalculate the discount percentage based on the roomType's netprice and the new discounted price
      const discountPercentage = originalPrice > 0
        ? ((originalPrice - newDiscountedPrice) / originalPrice) * 100
        : 0;

      updatedDiscount.discount_percentage = discountPercentage; // Update the discount percentage
    } else {
      updatedDiscount[field] = parseFloat(value) || 0;
    }

    updatedDiscounts[index] = updatedDiscount; // Update the specific discount at index
    return { ...prevFormData, discounts: updatedDiscounts }; // Return updated formData
  });
};

const addDiscount = () => {
  setFormData((prevFormData) => ({
      ...prevFormData,
      discounts: [
          ...prevFormData.discounts,
          { min_users: 0, discount_percentage: 0 }
      ]
  }));
};


const removeDiscount = (index) => {
  const updatedDiscounts = formData.discounts.filter((_, i) => i !== index);
  setFormData({
      ...formData,
      discounts: updatedDiscounts
  });
};
const getDiscountedPrice = (discountPercentage, originalPrice) => {
  return originalPrice - (originalPrice * discountPercentage / 100);
};


const deleteAll = async (e) => {
  e.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Call your delete API here
        const response = await axios.delete(`${Api}/api/availbilty/tour/${tour?.id}`); // Replace with your actual API endpoint
        
        // Handle success response
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        console.log("API Response:", response.data);
        window.location.reload();
      } catch (error) {
        // Handle error
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
        });
        console.error("Error during API call:", error);
      }
    }
  });
};

const deleteAvailabilityDay = (id) => async (e) => {
  e.preventDefault();

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Call the delete API using the ID dynamically
        const response = await axios.delete(`${Api}/api/availbilty/${id}`); // Replace with your actual endpoint
        Swal.fire({
          title: "Deleted!",
          text: "The item has been deleted.",
          icon: "success",
        });
        console.log('Response:', response.data);

        // Optionally reload the page after deletion
        window.location.reload();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Could not delete the item. Please try again.",
          icon: "error",
        });
        console.error("Error during API call:", error);
      }
    } else {
      console.log('User cancelled the delete action');
    }
  });
};

  const [selectedDay, setSelectedDay] = useState(null);

  const [activeDays, setActiveDays] = useState([]);

  const getAllSameDayInRange = (day, startDate, endDate, tour) => {
    const dayMapping = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
  
    if (!dayMapping.hasOwnProperty(day)) {
      console.error("Invalid day:", day);
      return [];
    }
  
    const targetDay = dayMapping[day];
    const availabilityFrom = tour?.availability?.from ? new Date(tour.availability.from) : null;
    const availabilityTo = tour?.availability?.to ? new Date(tour.availability.to) : null;
  
    if (!availabilityFrom || !availabilityTo) {
      console.error("Invalid availability range");
      return [];
    }
  
    const dates = [];
    let current = new Date(startDate);
  
    // Iterate through the range from startDate to endDate
    while (current <= endDate) {
      const currentDay = current.getDay();
      if (currentDay === targetDay) {
        const formattedDate = current.toISOString().split("T")[0];
        if (current >= availabilityFrom && current <= availabilityTo) {
          dates.push(formattedDate);
        }
      }
      current.setDate(current.getDate() + 1);
    }
  
    return dates;
  };
  
  const getAllSameDayInMonth = (day, year, tour) => {
    const dayMapping = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
  
    if (!dayMapping.hasOwnProperty(day)) {
      console.error("Invalid day:", day);
      return [];
    }
  
    const targetDay = dayMapping[day];
    const availabilityFrom = tour?.availability?.from ? new Date(tour.availability.from) : null;
    const availabilityTo = tour?.availability?.to ? new Date(tour.availability.to) : null;
  
    if (!availabilityFrom || !availabilityTo) {
      console.error("Invalid availability range");
      return [];
    }
  
    const dates = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
      let daysToAdd = targetDay - firstDayOfMonth.getUTCDay();
      if (daysToAdd < 0) daysToAdd += 7;
  
      for (
        let dayOfMonth = new Date(Date.UTC(year, month, 1 + daysToAdd));
        dayOfMonth.getUTCMonth() === month;
        dayOfMonth.setUTCDate(dayOfMonth.getUTCDate() + 7)
      ) {
        if (dayOfMonth >= availabilityFrom && dayOfMonth <= availabilityTo) {
          dates.push(dayOfMonth.toISOString().split("T")[0]);
        }
      }
    }
  
    return dates;
  };
  
  const handleDayButtonClick = (e, day) => {
    e.preventDefault();
  
    const startDate = new Date(tour?.availability?.from);
    const endDate = new Date(tour?.availability?.to);
  
    const sameDayDates = getAllSameDayInRange(day, startDate, endDate, tour);
  
    setActiveDays((prevActiveDays) => {
      return prevActiveDays.includes(day)
        ? prevActiveDays.filter((d) => d !== day)
        : [...prevActiveDays, day];
    });
  
    setFormData((prevState) => {
      return sameDayDates.every((date) => prevState.dates.includes(date))
        ? { ...prevState, dates: prevState.dates.filter((date) => !sameDayDates.includes(date)) }
        : { ...prevState, dates: [...prevState.dates, ...sameDayDates] };
    });
  };

  const handleOffDaysChange = (e) => {
    const newDate = e.target.value;
  
    const availabilityFrom = new Date(tour?.availability?.from);
    const availabilityTo = new Date(tour?.availability?.to);
    const selectedDate = new Date(newDate);
  
    // Ensure the selected date is within range
    if (selectedDate < availabilityFrom || selectedDate > availabilityTo) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: `Selected date is outside the valid range. Please select a valid date, between ${tour?.availability?.from
        ? new Date(tour?.availability?.from).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) 
        : tour?.availability?.from } : ${tour?.availability?.to
        ? new Date(tour?.availability?.to).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) 
        : tour?.availability?.to }`,
        confirmButtonText: "OK",
      });
      e.target.value = ""; 
      return;
    }
  
    // If valid, add to formData
    setFormData((prevState) => {
      if (prevState.dates.includes(newDate)) {
        return prevState;
      }
      return {
        ...prevState,
        dates: [...prevState.dates, newDate],
      };
    });
  };

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const daysOfWeek = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 1 },
    { name: "Tuesday", value: 2 },
    { name: "Wednesday", value: 3 },
    { name: "Thursday", value: 4 },
    { name: "Friday", value: 5 },
    { name: "Saturday", value: 6 },
  ];

  const calculateAllDatesInRange = (e) => {
    e.preventDefault();
  
    if (!fromDate || !toDate) {
      Swal.fire("Please select both From and To dates.");
      return;
    }
  
    const from = new Date(fromDate);
    const to = new Date(toDate);
  
    if (from > to) {
      Swal.fire("Invalid range: From date is after To date.");
      return;
    }
  
    const dates = [];
    for (let current = new Date(from); current <= to; current.setDate(current.getDate() + 1)) {
      const formattedDate = current.toISOString().split("T")[0];
      if (!formData.dates.includes(formattedDate)) dates.push(formattedDate);
    }
  
    setFormData((prevState) => ({ ...prevState, dates: [...prevState.dates, ...dates] }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "from") {
      setFromDate(value);
    } else if (name === "to") {
      setToDate(value);
    }
  };

  useEffect(() => {
    if (!fromDate || !toDate) return;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (from > to) return; // Exit if the range is invalid.

    const dates = [];
    let current = new Date(from);

    while (current <= to) {
      const formattedDate = current.toISOString().split("T")[0];
      if (!formData.dates.includes(formattedDate)) {
        dates.push(formattedDate);
      }
      current.setDate(current.getDate() + 1);
    }

    setFormData((prevState) => ({
      ...prevState,
      dates: dates,
    }));
  }, [fromDate, toDate]); 

  const handleRemoveOffDay = (e, index) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      dates: prevState.dates.filter((_, i) => i !== index),
    }));
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

  const adultRoom = tour.room_types.find(room => room.name === 'adult');
  const originalPrice = adultRoom ? adultRoom.netprice : 0;


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
              <div className="requests-status">
                <h2>
                  tour ID <span>{tour?.id}</span>
                </h2>
              </div>

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
                  <div className="col-md-6">
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
                        <label>Cancellation policy</label>
                        <h2>{tour?.cancellation_policy}</h2>
                        {/* <h2>{tour?.cancellation_policy?.ar}</h2> */}
                      </div>
                      <div className="col-md-6 mt-5">
                        <label>Availability To Cancel</label>
                        <h2>{tour?.availabilityToCancel}</h2>
                        {/* <h2>{tour?.cancellation_policy?.ar}</h2> */}
                      </div>
                    </div>
                  </div>
                  {tour?.tour_type !== "multi-day" && tour?.room_types !== "multi-day" ?
                    <div className="col-md-6">
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
                                    value={discount.min_users == 0 ? 0 : originalPrice - Math.round(originalPrice * discount.discount_percentage / 100)}
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
                  <div className="col-md-12 mt-5">
                      <div className="d-flex justify-content-between mb-4 align-items-center">
                        <label>Available Days</label>
                        {tour?.AvailabilityDays?.length === 0 ? '' :
                        <button className="btn btn-danger" onClick={deleteAll}>Delete All Availability</button> }
                      </div>
                    {tour?.AvailabilityDays?.map((x, index) => (
                      <div key={index}>
                        <div className="row">
                          <div className="col-md-3">
                            <label>Day</label>
                            <h2>{moment(x.dates[0]).format('DD/MM/YYYY')}</h2>
                          </div>
                          <div className="col-md-8 border-bottom pt-3 pb-3">
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
                                              value={x.room_types[0].price - Math.round(x.room_types[0].price * discount.discount_percentage / 100)}
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
                          <div className="col-md-1">
                            <button className="btn btn-danger w-100 mb-4 mt-4" onClick={deleteAvailabilityDay(x._id)}><i className="fa fa-trash"></i></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-5">
                  {tour?.status == "pending" || tour.status == "accepted" ? 
                  <button type="button" className='btn btn-primary' onClick={handleOpenModal}>Add Availability</button> : ""}
                  <div>
                    <button className="btn btn-danger me-3" onClick={(e) => handleDelete(e, currentPath, tour?.vendor)}>Cancel Tour</button>
                    {/* <button className='btn btn-primary' onClick={(e) => handleFull(e, currentPath, tour?.vendor)}>Full Capacity</button> */}
                  </div>
                </div>

                {showModal && (
                      <div className="mt-5">
                        <div className="">
                          <div className='row'>
                            <div className="col-md-5 border border-top-0 border-start-0 border-bottom-0">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="form-group">
                                  <label>From Date:</label>
                                  <input
                                    type="date"
                                    name="from"
                                    value={fromDate}
                                    onChange={handleDateChange}
                                    min={tour?.availability?.from}
                                    max={tour?.availability?.to}
                                    onKeyDown={(e) => e.preventDefault()}
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group">
                                  <label>To Date:</label>
                                  <input
                                    type="date"
                                    name="to"
                                    value={toDate}
                                    onChange={handleDateChange}
                                    min={tour?.availability?.from}
                                    max={tour?.availability?.to}
                                    onKeyDown={(e) => e.preventDefault()}
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              <div className="form-group">
                                <label htmlFor="dates">Add Days:</label>
                                <input
                                  type="date"
                                  name="dates"
                                  onChange={handleOffDaysChange}
                                  min={tour?.availability?.from}
                                  max={tour?.availability?.to}
                                  onKeyDown={(e) => e.preventDefault()}
                                  className="form-control"
                                />
                              </div>

                              <div className="buttons">
                                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                                  <button
                                    key={day}
                                    onClick={(e) => handleDayButtonClick(e, day)}
                                    className={`all-days ${activeDays.includes(day) ? "active" : ""}`}
                                  >
                                    All {day}s
                                  </button>
                                ))}
                              </div>

                              <div className="off-days-list">
                                <strong>Selected Days:</strong>
                                <ul>
                                  {formData.dates.map((offDay, index) => (
                                    <li key={index} className="day-selected">
                                      {offDay}{' '}
                                      <button
                                        onClick={(e) => handleRemoveOffDay(e, index)}
                                        className="btn btn-sm btn-danger "
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className='col-md-7'>
                              {tour?.tour_type !== "multi-day" ? (
                                <div className="row">
                                  <div className="col-md-12">
                                    <label>Pricing</label>
                                    {formData.room_types.map((roomType, index) => {
                                const originalPrice = roomType.netprice || 0; // Get the current roomType's netprice

                                return (
                                  <div className="row" key={index}>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label>{roomType.name}</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={roomType.name}
                                          disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <label>Net Price</label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          value={roomType.netprice || ''} // Ensure input is editable even when netprice is 0
                                          onChange={(e) => handleRoomTypeChange(index, 'netprice', e)} // Update netprice in state
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <label>Count</label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          value={1} // Default count value is 1
                                          disabled={roomType.occupancyadult === 0} // Disable if it's a children room
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                                  </div>
                                </div>
                              ) : 
                              <div className="row">
                                      <div className="col-md-12">
                                          <label>Room Types</label>
                                          <h3>Room Types</h3>
                                    <select value={selectedRoomType} className="form-control mb-3" onChange={handleRoomTypeSelect}>
                                      <option value="">Select Room Type</option>
                                      {predefinedRoomTypes.map((room, index) => (
                                        <option key={index} value={room.name}>
                                          {room.name}
                                        </option>
                                      ))}
                                    </select>
                                    {formData.room_types.map((room, index) => (
                                      <div className='row'>
                                          <div className='col-md-10'>
                                              <div key={index} className="room-type-entry">
                                                  <div className='row'>
                                                      {["name", "occupancyadult", "occupancychildern", "netprice"].map((key) => (
                                                          <div className='col-md-6'>
                                                              <div className='form-group'>
                                                                  <label key={key}>
                                                                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                                                                  </label>
                                                                  <input
                                                                      type={key === "netprice" ? "number" : "text"}
                                                                      value={room[key]} className='form-control'
                                                                      onChange={(e) => handleRoomChange(index, key, e.target.value)}
                                                                      required
                                                                  />
                                                              </div>
                                                          </div>
                                                      ))}
                                                  </div>
                                              </div>
                                          </div>
                                          <div className='col-md-2 mt-3'>
                                              <button type="button" className='btn btn-danger' onClick={() => removeRoomType(index)}>
                                                  Remove
                                              </button>
                                          </div>
                                      </div>
                                    ))}
                                    <button type="button" className='btn btn-primary' onClick={addNewRoomType}>
                                      Add Custom Room Type
                                    </button>
                                      </div>
                                  </div>}

                              {tour?.tour_type !== "multi-day" && tour?.room_types !== "multi-day" ? (
                            formData.discounts.map((discount, index) => {
                              {/* const originalPrice = formData.room_types[index]?.netprice || 0;  */}
                              const roomTypes = formData.room_types || [];
                              const adultRoomType = roomTypes.find(room => room.name === 'adult');
                              const originalPrice = adultRoomType ? adultRoomType.netprice : 0;

                              return (
                                <div key={index} className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Minimum Users</label>
                                      <input
                                        type="number"
                                        className="form-control"
                                        // value={discount.min_users }
                                        onChange={(e) => handleDiscountChange(index, 'min_users', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Discounted Price</label>
                                      <input
                                        type="number"
                                        className="form-control"
                                        value={discount.discounted_price || ''} // Show the current discounted price
                                        onChange={(e) => handleDiscountChange(index, 'discounted_price', e.target.value)} // Handle input change
                                        max={originalPrice} // Max value = netprice from room type
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                              ) : ""}

                              {tour?.tour_type !== "multi-day" && tour?.room_types !== "multi-day" ?
                              <div className="form-group">
                                  <button type="button" onClick={addDiscount} className="btn btn-primary">
                                      Add Discount
                                  </button>
                              </div> : ""}


                            </div>
                          </div>
                        </div>
                        <div className="mt-5">
                          <button
                            type="button"
                            className="btn btn-secondary me-3"
                            onClick={handleCloseModal}
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary" onClick={addAvailability}>
                            Save Changes
                          </button>
                        </div>
                      </div>
                )}
              </form>

            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default TourDetails;