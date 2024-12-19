import React, { useState, useEffect } from "react";
import Navbar_Web from "../Navbar/Navbar";
import Modal from 'react-bootstrap/Modal';
import italy from "../Assets/img/8f2a938b311626d4ff9b91b3cbf8a4f6.png";
import Maldives from "../Assets/img/86030c9a00056616ee895d7f9bed0b22.png";
import France from "../Assets/img/d7d79b7a2cc3216ac9a9682a5242cb3c.png";
import Greece from "../Assets/img/d96a308b980e8268f79eca9a2382b030.png";
import Swal from "sweetalert2";
import axios from "axios";
import Api from "../../../services/api";
import { Link } from "react-router-dom";
import "../Assets/Css/Web.css";
// import Gallery from "./Gallery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Partner from "./Partner";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTourById } from "../../../services/apiservices//TourService";
import { getUser } from "../../../services/apiservices/webService";
import Footer_web from "../Footer/Footer";
import { Container } from "@chakra-ui/react";

function Booking_details() {
const { id: currentPath } = useParams();
  const navigate = useNavigate();
  
  const {
    data: destinations,
    error,
    isLoading,
  } = useQuery(["tour", currentPath], () => getTourById(currentPath));

  
  const { data: User } = useQuery("User", getUser);
  const [finalPrice, setFinalPrice] = useState();

  const [count, setCount] = useState(0);

  const [bookId, setBookId] = useState();
  const [bookingPrice, setBookPrice] = useState();
  const [bookingType, setRoomType] = useState("private");
  const [lang, setLang] = useState("English");
  const onOptionChange = (e) => {
    setRoomType(e.target.value);
    setLang(e.target.value);
  };

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(User?);
  const [roomsData, setRoomsData] = useState([]);
  const [roomsDataa, setRoomsDataa] = useState([]);
  const [availabilityDataDiscounts, setAvailabilityDataDiscounts] = useState([]);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    rooms: [
      {
        quantity: count, 
      },
    ],
    numberOfAdults: 1,
    numberOfChildren: 1,
  });

  const programDays = destinations?.data?.programdays || 0;
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      const startDate = new Date(value);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + programDays);
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: value,
        endDate: endDate.toISOString().split("T")[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const shouldIncludeAvailability = destinations?.data.AvailabilityDays.includes(selectedDate);
  //   // Filter roomsData to include only rooms with quantity > 0
  //   // const filteredRoomsData = roomsData.filter((room) => room.quantity > 0);
  //   const filteredRoomsData = shouldUseRoomsDataa()
  // ? roomsDataa.filter((room) => room.quantity > 0)
  // : roomsData.filter((room) => room.quantity > 0);
  
  //   const data = {
  //     ...formData,
  //     bookingType: bookingType,
  //     user: User?.data._id,
    
  //     tour: destinations?.data.id,
  //     rooms: filteredRoomsData, // Use filteredRoomsData here
  //     language: selectedLanguage, // Include the selected language
  //     startDate: destinations?.data.tour_type != "multi-day" ? formData.endDate : formData.startDate
  //   };
  //   // if (destinations?.data.AvailabilityDays) {
  //   //   data.availability =destinations?.data.AvailabilityDays[0]._id ;
  //   // }
  //   try {
  //     const response = await axios.post(`${Api}/api/bookings`, data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     const bookingId = response.data.data._id;
  //     const bookingPrice = response.data.data.totalPrice;
  
  //     if (bookingId) {
  //       setBookPrice(bookingPrice);
  //       setBookId(bookingId);
  //       console.log("Booking ID:", bookingId);
  //       setShow(true);
  
  //       setPostData((prevData) => ({
  //         ...prevData,
  //         orderId: bookingId,
  //         userId: User?.data._id,
  //       }));
  
  //       Swal.fire({
  //         icon: "success",
  //         title: "Your booking has been saved",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     } else {
  //       throw new Error("Booking ID not found in response");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong!",
  //     });
  //   }
  
  //   // Reset the form if needed
  //   setFormData("");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Determine which rooms data to use and filter for quantity > 0
    const filteredRoomsData = shouldUseRoomsDataa()
      ? roomsDataa.filter((room) => room.quantity > 0)
      : roomsData.filter((room) => room.quantity > 0);
  
    // Validate input data
    if (!filteredRoomsData.length) {
      Swal.fire({
        icon: "warning",
        title: "No rooms selected",
        text: "Please select at least one room to proceed.",
      });
      return;
    }
  
    // Construct data object for submission
    const data = {
      ...formData,
      bookingType,
      user: User?.data._id,
      tour: destinations?.data.id,
      rooms: filteredRoomsData,
      language: selectedLanguage,
      // startDate: destinations?.data.tour_type !== "multi-day" ? formData.endDate : formData.startDate,
      endDate: destinations?.data.tour_type !== "multi-day" ? formData.startDate : formData.endDate,
    };
  
    // Include availability if applicable
    // if (destinations?.data.AvailabilityDays) {
    //   data.availability = destinations?.data.AvailabilityDays[0]?._id;
    // }
  
    try {
      // Make API call
      const response = await axios.post(`${Api}/api/bookings`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/Web_Profile")
  
      // const bookingId = response.data.data._id;
      // const bookingPrice = response.data.data.totalPrice;
  
      // if (bookingId) {
      //   setBookPrice(bookingPrice);
      //   setBookId(bookingId);
      //   // setShow(true);
  
      //   // setPostData((prevData) => ({
      //   //   ...prevData,
      //   //   orderId: bookingId,
      //   //   userId: User?.data._id,
      //   // }));
  
      //   Swal.fire({
      //     icon: "success",
      //     title: "Your booking has been saved",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // } else {
      //   throw new Error("Booking ID not found in response");
      // }
    } catch (error) {
      console.error("Error during booking submission:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  
    // Reset the form after submission
    setFormData("");
  };
  
  
  
  const getAvailabilityId = (startDate) => {
    if (!startDate) return null;
  
    const dateObj = new Date(startDate);
    if (isNaN(dateObj.getTime())) return null;
  
    if (!destinations?.data?.AvailabilityDays) return null;
  
    const formattedStartDate = dateObj.toISOString();
    const matchedDay = destinations?.data.AvailabilityDays.find((day) =>
      day.dates.includes(formattedStartDate)
    );

    return matchedDay ? {a:matchedDay._id,x:matchedDay?.room_types,y:matchedDay?.discounts} : null;
  };
  
  useEffect(() => {
    const availabilityData = getAvailabilityId(formData.startDate);
  
    if (availabilityData) {
      console.log("Availability ID found:", availabilityData.a);
      console.log("Availability Room Types:", availabilityData.x);
      console.log("Availability Room Types:", availabilityData.y);
    
      setAvailabilityDataDiscounts(
        availabilityData.y?.map((discount) => ({
          min_users: discount.min_users,
          discount_percentage: discount.discount_percentage,
        })),
      );
    
      // Map room types for the selected day
      setRoomsDataa(
        availabilityData.x?.map((roomType) => ({
          roomType: roomType.name,
          pricePerRoom: roomType.price,
          quantity: 0,
          totalPrice: 0,
        })),
      );
    
      // Update form data with availability ID
      setFormData((prev) => ({
        ...prev,
        availability: availabilityData.a,
      }));
    } else {
      console.log("No availability found for the selected start date.");
      console.log(formData.availability);
      setRoomsDataa([]); // Reset roomsDataa if no match
      setFormData((prev) => {
        const updatedFormData = { ...prev };
        if (updatedFormData.hasOwnProperty('availability')) {
          delete updatedFormData.availability;
        }
        console.log("Updated FormData:", updatedFormData); // Confirm here
        console.log("Updated FormData:", updatedFormData.availability); // Confirm here
        return updatedFormData;
      });
    }

  }, [formData.startDate, destinations?.data?.AvailabilityDays]);
  

console.log(roomsDataa);

  useEffect(() => {
    if (bookId, bookingPrice) {
      console.log("Book ID has been set:", bookId);
    }
  }, [bookId, bookingPrice]);


  const [postData, setPostData] = useState({
    orderId: bookId,
    // expiryDate: "",
    userId: User?.data._id,
  });
    
  const PostPayment = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${Api}/api/create-session`, postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        window.location.replace(response.data.data.paymentUrl)
        return;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  }

  const CancelPayment = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`${Api}/api/bookings/${bookId}/cancel`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        navigate("/Web_Profile")
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          text: "Something went wrong!",
        });
      });
    setFormData("");
  };

  const expiry_format = (value) => {
    const expdate = value.replace(/\D/g, ""); // remove all non-digit characters
    const expDateFormatter =
      expdate.substring(0, 2) + (expdate.length > 2 ? "/" : "") + expdate.substring(2, 4);
    return expDateFormatter;
  };
  
  const onChangeExp = (e) => {
    const formattedExpiryDate = expiry_format(e.target.value);
    setPostData({
      ...postData,
      expiryDate: formattedExpiryDate,
    });
  };


  useEffect(() => {
    if (destinations?.data) {
      const initialRoomsData = destinations.data.room_types.map((roomType) => ({
        roomType: roomType.name,
        pricePerRoom: roomType.price,
        quantity: 0,
        totalPrice: 0,
      }));
      setRoomsData(initialRoomsData);
    }
  }, [destinations]);
  

  const isDateWithinAvailability = (dateString) => {
    if (!dateString || !destinations?.data?.AvailabilityDays) return false;
  
    const dateToCheck = new Date(dateString);
  
    // Map over the available dates in `AvailabilityDays`
    return destinations?.data?.AvailabilityDays.some((availability) => {
      const dates = availability.dates || [];
      return dates.some((date) => new Date(date).toISOString() === dateToCheck.toISOString());
    });
  };

  const shouldUseRoomsDataa = () => {
    return formData.startDate && isDateWithinAvailability(formData.startDate);
  };

  const increment = (e, index) => {
    e.preventDefault();
  
    const updateRooms = (prevRooms) =>
      prevRooms.map((room, idx) => {
        if (idx === index) {
          const updatedQuantity = (room.quantity || 0) + 1;
          const updatedTotalPrice = updatedQuantity * (room.pricePerRoom || 0);
  
          return {
            ...room,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPrice,
          };
        }
        console.log(room);
        return room;
      });
  
    if (shouldUseRoomsDataa()) {
      setRoomsDataa((prev) => updateRooms(prev || []));
    } else {
      setRoomsData((prev) => updateRooms(prev || []));
    }
  };
  
  
  // const increment = (e, index) => {
  //   e.preventDefault();
  //   console.log("Increment: Before roomsDataa or roomsData logic", { roomsDataa, roomsData });
  
  //   const updateRooms = (prevRooms) =>
  //     prevRooms.map((room, idx) => {
  //       if (idx === index) {
  //         const updatedQuantity = room.quantity + 1;
  //         const updatedTotalPrice = updatedQuantity * (room.price || 0);
  
  //         console.log("Incremented room:", { ...room, quantity: updatedQuantity, totalPrice: updatedTotalPrice });
  
  //         return {
  //           ...room,
  //           quantity: updatedQuantity,
  //           totalPrice: updatedTotalPrice,
  //         };
  //       }
  //       return room;
  //     });
  
  //   if (shouldUseRoomsDataa()) {
  //     console.log("Using roomsDataa for increment");
  //     setRoomsDataa(updateRooms);
  //     setRoomsData();
  //   } else {
  //     console.log("Using roomsData for increment");
  //     setRoomsData(updateRooms);
  //     setRoomsDataa();
  //   }
  // };
  
  // Updated decrement logic
  const decrement = (e, index) => {
    e.preventDefault();
  
    const updateRooms = (prevRooms) =>
      prevRooms.map((room, idx) => {
        if (idx === index) {
          const updatedQuantity = Math.max(room.quantity - 1, 0);
          const updatedTotalPrice = updatedQuantity * (room.price || 0);

          return {
            ...room,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPrice,
          };
        }
        return room;
      });
  
    if (shouldUseRoomsDataa()) {
      setRoomsDataa(updateRooms);
    } else {
      setRoomsData(updateRooms);
    }
  };

  
  

  

  return (
    <>
      <div className="Destinations">
        <Navbar_Web />
        <div className="booking-id">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>Booking Details</h1>
              </div>
              <div className="col-md-7">
                <form className="booking-form">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="name"
                          value={User?.data.name}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="email"
                          disabled
                            value={User?.data.email}
                          //   onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>WhatsApp Number</label>
                        <input
                          type="number"
                          name="WhatsApp"
                          placeholder="WhatsApp Number"
                          disabled
                            value={User?.data.phone}
                          //   onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tour Start Date</label>
                        <input
                          type="text"
                          name=""
                          placeholder=""
                          value={destinations?.data.availability.from 
                          ? new Date(destinations.data.availability.from).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }) 
                          : destinations?.data.availability.from }
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tour End Date</label>
                        <input
                          type="text"
                          name=""
                          placeholder=""
                          value={destinations?.data.availability.to 
                          ? new Date(destinations.data.availability.to).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }) 
                          : destinations?.data.availability.to }
                          disabled
                        />
                      </div>
                    </div>
                    {destinations?.data.tour_type != "multi-day" ? 
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Date</label>
                            <input
                              type="date"
                              name="startDate"
                              placeholder="startDate"
                              min={destinations?.data.availability?.to}
                              max={destinations?.data.availability?.from}
                              value={formData.startDate}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    : 
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Departure Date</label>
                          <input
                      type="date"
                      min={destinations?.data?.availability?.to}
                      max={destinations?.data?.availability?.from}
                      name="startDate"
                      placeholder="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                        </div>
                      </div> 
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Arrival Date</label>
                          <input
                            type="date"
                            name="endDate"
                            placeholder="endDate"
                            min={destinations?.data.availability?.to}
                            max={destinations?.data.availability?.from}
                            value={formData.endDate}
                            onChange={handleChange}
                            readOnly // Make it read-only to prevent manual editing
                          />
                        </div>
                      </div>
                    </div>

                    }
                    <div className="col-md-12">
                      <div className="border-form"></div>
                    </div>
                      {shouldUseRoomsDataa() 
      ? roomsDataa?.length > 0 &&
  roomsDataa.map((room, index) => (
    <div className="col-md-4" key={index}>
      <div className="room-count mb-3">
      <label>
                {room.roomType} ({room.pricePerRoom})
                {destinations?.data.tour_type !== "multi-day" && room.roomType !== "children" && (
                  <>
                    {availabilityDataDiscounts?.map((discount, idx) => (
                      <li key={idx}>
                        If number Of Users exceeds {discount.min_users}, offer price will be: (
                        {room.pricePerRoom -
                          (room.pricePerRoom * discount.discount_percentage) / 100})
                      </li>
                    ))}
                  </>
                )}
              </label>
        <div className="room-count-button">
          <button
            onClick={(e) => decrement(e, index)}
            className={room.quantity === 0 ? "disable" : ""}
            disabled={room.quantity === 0}
          >
            -
          </button>
          <span>{room.quantity || 0}</span>
          <button onClick={(e) => increment(e, index)}>+</button>
        </div>
        <p>Total Price: {room.totalPrice || 0}</p>
      </div>
    </div> ))
      : roomsData.map((room, index) => (
          <div className="col-md-4" key={index}>
            <div className="room-count mb-3">
              <label>
                {room.roomType} ({room.pricePerRoom})
                {destinations?.data.tour_type !== "multi-day" && room.roomType !== "children" && (
                  <>
                    {destinations?.data?.discounts?.map((discount, idx) => (
                      <li key={idx}>
                        If number Of Users exceeds {discount.min_users}, offer price will be: (
                        {room.pricePerRoom -
                          (room.pricePerRoom * discount.discount_percentage) / 100})
                      </li>
                    ))}
                  </>
                )}
              </label>
              <div className="room-count-button">
                <button
                  onClick={(e) => decrement(e, index)}
                  className={room.quantity === 0 ? "disable" : ""}
                >
                  -
                </button>
                <span className={room.quantity === 0 ? "disable" : ""}>
                  {room.quantity}
                </span>
                <button onClick={(e) => increment(e, index)}>+</button>
              </div>
              <p>Total Price: {room.quantity * room.pricePerRoom}</p>
            </div>
          </div>
        ))}
        


                    <div className="col-md-12 mt-3">
                      <div className="border-form"></div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tour Language</label>
                        {destinations?.data.languages?.map((language, index) => (
                          <div className="form-check" key={index}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="lang"
                              id={language}
                              value={language}
                              onChange={(e) => setSelectedLanguage(e.target.value)} // Update selected language
                            />
                            <label className="form-check-label" htmlFor={language}>
                              {language}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-5">
                <div className="booking-details-id align-items-start">
                  <h2>{destinations?.data.brief}</h2>
                  {/* <p></p> */}
                  <div className="tour-rating mb-3">
                    <span>
                      <i className="fa fa-clock"></i>
                      {destinations?.data.programdays} Days
                    </span>
                    <span>
                      <i className="fa fa-map"></i>
                      {destinations?.data.destination.country?.en}
                    </span>
                  </div>
                  <div className="border-form"></div>
                  <div className="row w-100">
                    <div className="col-md-12">
                      <h4>
                        Language <span>{lang}</span>
                      </h4>
                    </div>
                    {/* <div className="col-md-12">
                      <h3 className="mt-4">Discounts Offers</h3>
                        {destinations?.data?.discounts?.map((x) => (
                          <li>Min Users:{x?.min_users} Have Discount {x?.discount_percentage}%</li>
                        ))}
                    </div> */}
                    <div className="col-md-12">
                      <div className="subtotal">
                        {/* <div> */}
                          {/* <span>Subtotal</span> */}
                          {/* <h2>{finalPrice == undefined ?  bookingType === "private" ?  destinations?.data.private : destinations?.data.shared : finalPrice } EGP</h2> */}
                          {/* <h2>{bookingType === "private" ?  destinations?.data.private : destinations?.data.shared } EGP</h2> */}
                        {/* </div> */}
                        <button
                          className="signIn w-100"
                          onClick={handleSubmit}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <Link
                    to={`/Booking_details/${destinations?.data.id}`}
                    className="signIn"
                  >
                    BOOK NOW
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tour-details-id">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="booking-des">
                  <h2>Description</h2>
                  <p>{destinations?.data.brief}</p>
                  <h4 className="mt-4">Cancelation</h4>
                  <p>{destinations?.data.cancellation_policy}</p>
                  {/* <h4 className="mt-4">Discounts Offers</h4>
                    {destinations?.data?.discounts?.map((x) => (
                      <li>Min Users:{x?.min_users} Have Discount {x?.discount_percentage}%</li>
                    ))} */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="booking-des">
                  <h3>What you will do</h3>
                  <ul>
                    {destinations?.data?.program?.map((x, index) => (
                      <li key={index}>{x?.details}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="booking-des included">
                  <h3 className="mb-3">What is included / Excluded</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <h2>included</h2>
                      <ul>
                        {destinations?.data?.excludes?.map((x, index) => (
                          <li key={index}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h2>Excluded</h2>
                      <ul>
                        {destinations?.data?.includes?.map((x, index) => (
                          <li key={index}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer_web />

        {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className="form-payment">
            <div className="row">
              <div className="col-md-12">
                <h2>Total : {bookingPrice}</h2>
                <div className="payment-button">
                  <button className="explore" data-bs-dismiss="modal" onClick={PostPayment}>
                    Confirm
                  </button>
                  <button className="cancel" data-bs-dismiss="modal" onClick={CancelPayment}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
          </Modal.Body>
        </Modal> */}
      </div>
    </>
  );
}

export default Booking_details;
