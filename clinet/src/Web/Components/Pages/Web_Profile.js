import React, { useState, useEffect } from "react";
import Navbar_Web from "../Navbar/Navbar";
import Guide_img from "../Assets/img/269aaa05cf523ad8940f7bdd4dc9f59e.jpeg";
import story from "../Assets/img/7c4485e3a47d89c8161bcd5691c1ca8a.jpeg";
import mission from "../Assets/img/56577db3c25d5e08664c736cd9ae095e.jpeg";
import "../Assets/Css/Web.css";
import Gallery from "./Gallery";
import Swal from "sweetalert2";
import axios from "axios";
import Partner from "./Partner";
import { useNavigate } from "react-router-dom";
import Footer_web from "../Footer/Footer";
import { Link } from "react-router-dom";
import Api from "../../../services/api";
import { useQuery } from "react-query";
import { getUser } from "../../../services/apiservices/webService";

function Web_Profile() {
  const navigate = useNavigate();
  const { data: User, isLoading, error } = useQuery("User", getUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Update formData once User data is available
  useEffect(() => {
    if (User?.data) {
      setFormData({
        name: User.data.name || "",
        email: User.data.email || "",
        phone: User.data.phone || "",
        password: "", // Keep password field empty for security purposes
      });
    }
  }, [User]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${Api}/api/users/profile/${User?.data._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your profile has been updated.",
      });

      // Optionally, navigate to another page
      console.log("Profile updated:", response.data);

    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error updating profile:", error);
    }
  };
  
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("accessToken");
  console.log(token);
  
  
  const Logout = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`${Api}/api/auth/logout`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'role': 'user',
        },
      })
      .then((res) => {
        navigate("/Login_Web");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const CancelPayment = async (e, bookId) => {
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

  const PostPayment = async (e, orderId) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${Api}/api/create-session`, {
          orderId: orderId,
          userId: userId,
        },
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


  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsOpen(false); // Close the modal
  };

  const [selectedTourId, setSelectedTourId] = useState(null);

  const handleSendReview = async (e, userId, tourId) => {
    e.preventDefault(); // Prevent default form behavior
    if (!rating || !reviewText) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete",
        text: "Please provide a star rating and write a review.",
      });
      return;
    }
  
    try {
      const response = await axios.post("http://185.170.198.81/api/reviews", {
        user: userId,
        tour: tourId,
        rating,
        comment: reviewText,
      });
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your review has been submitted successfully.",
        });
        handleCloseModal(); // Close the modal after successful submission
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Rating Failed",
        text: error.response?.data?.message || "An error occurred.",
      });
    }
  };
  


  return (
    <>
      <div className="">
        <Navbar_Web />
        <div className="profile-card">
          <div className="container">
            <form>
              <div className="row">
                <div className="col-md-12">
                  <h1>
                    Personal Info
                    <a href="#!" onClick={handleSubmit} className="">
                      Edit
                    </a>
                  </h1>
                </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Username"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
              </div>
            </form>
            <div className="booking-card">
              <h3>My Bookings</h3>
              {User?.data.bookings?.map((x, index) => (
  <div className="booking-history-profile" key={index}>
    <h4>
      <strong>
        {x.tour.title.en}
        <span>( #{x._id} )</span>
      </strong>
      {x.opentopaid === false && x.status === "pending" ? (
        <a href="#!" onClick={(e) => CancelPayment(e, x._id)}>
          Cancel
        </a>
      ) : (
        ""
      )}
      {x.status === "confirmed" ? (
        <a
          href="#!"
          className="btn ms-3 me-3"
          onClick={() => {
            setSelectedTourId(x.tour.id); // Store the selected tour ID
            handleOpenModal(); // Open the modal
          }}
        >
          Add Rating
        </a>
      ) : (
        ""
      )}
    </h4>
    <p>
      <span>Title : {x.tour.title}</span>
      <span>Tour ID : {x.tour.id}</span>
      <span>
        Start Date :{" "}
        {x.startDate
          ? new Date(x.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : x.startDate}
      </span>
      <span>
        End Date :{" "}
        {x.endDate
          ? new Date(x.endDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : x.endDate}
      </span>
      <span>Status: {x.status}</span>
      <span>Total Price : {x.totalPrice} EGP</span>
      {x.opentopaid === true && x.status !== "confirmed" ? (
        <a
          href="#!"
          className="btn btn-primary"
          onClick={(e) => PostPayment(e, x._id)}
        >
          Pay Your Trip
        </a>
      ) : (
        ""
      )}
    </p>
  </div>
))}

{isOpen && selectedTourId && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="modal-title">Leave a Review</h2>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            className={`fa fa-star ${
              hoverRating >= star || rating >= star ? "active" : ""
            }`}
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              cursor: "pointer",
              fontSize: "32px",
              margin: "0 5px",
            }}
          ></i>
        ))}
      </div>

      <textarea
        className="review-textarea"
        placeholder="Write your review here..."
        name="comment"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      <div className="modal-actions">
        <button className="cancel-button" onClick={handleCloseModal}>
          Cancel
        </button>
        <button
          className="send-button"
          onClick={(e) => handleSendReview(e, userId, selectedTourId)}
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}
            </div>
            <div className="booking-card">
              <div className="popular p-0">
                <h3>My Favorite Tours</h3>
                <div className="row">

                  {User?.data.tourwishlist?.map((x, index) => (
                    <div className="col-md-4 position-relative" key={x.id}>
                          <div
                            className="popular-tour"
                            style={{
                              backgroundImage: `url(http://185.170.198.81/${x.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              height: "400px",
                            }}
                          >
                            <Link to={`/Tour_details/${x._id}`}>
                              <div className="popular-layout">
                                <div className="popular-des">
                                  <strong>
                                    {x?.room_types[0]?.price}$
                                  </strong>
                                  <h3>{x?.title?.en}</h3>
                                  <div className="d-flex align-items-center">
                                    <span>
                                      <i className="fa fa-clock"></i>
                                      {x?.programdays} Days
                                    </span>
                                    <span>
                                      {/* <i className="fa fa-map"></i> */}
                                      {/* {destination.destination.country.en} */}
                                    </span>
                                    <span>
                                      {/* <i className="fa fa-star"></i> */}
                                      {/* {destination.destination.rating} */}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
    ))}
                </div>
              </div>
            </div>
            <div className="booking-card">
              <div className="popular p-0">
                <h3>My Favorite Destination</h3>
                <div className="row">

                  {User?.data.destinationwishlist?.map((x, index) => (
                    <div className="col-md-4" key={x.id}>
                          <div
                            className="popular-tour"
                            style={{
                              backgroundImage: `url(http://185.170.198.81/${x.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              height: "400px",
                            }}
                          >
                            <Link to={`/Destinations_tours/${x.destination?._id}`}>
                              <div className="popular-layout">
                                <p>{x?.destination?.tourcount} Tours</p>
                                <div className="popular-des">
                                  <h3>{x?.destination?.country?.en}</h3>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
    ))}
                </div>
              </div>
            </div>
            <button className="logout" onClick={Logout}>Log Out</button>
          </div>
        </div>
        <Footer_web />
      </div>
    </>
  );
}

export default Web_Profile;
