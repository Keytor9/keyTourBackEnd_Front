import React, { useEffect, useState } from "react";
import Navbar_Web from "../Navbar/Navbar";
import italy from "../Assets/img/8f2a938b311626d4ff9b91b3cbf8a4f6.png";
import Maldives from "../Assets/img/86030c9a00056616ee895d7f9bed0b22.png";
import France from "../Assets/img/d7d79b7a2cc3216ac9a9682a5242cb3c.png";
import Greece from "../Assets/img/d96a308b980e8268f79eca9a2382b030.png";
import Api from "../../../services/api";
import { Link } from "react-router-dom";
import "../Assets/Css/Web.css";
import Gallery from "./Gallery";
import { useParams, useNavigate } from "react-router-dom";
import Partner from "./Partner";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllTourByDestinations } from "../../../services/apiservices//TourService";
import {
  getAllDestinationsCountry,
  updateDestination,
  deleteDestination,
} from "../../../services/apiservices/DestinationService";
import Footer_web from "../Footer/Footer";
import Swal from "sweetalert2";
import axios from "axios";

function Destinations_tours() {
  const { id: currentPath } = useParams(); // Get the id from the route params
  const navigate = useNavigate();
  //   const { data: destinations, isLoading, error } = useQuery('destinations', getAllTourByDestinations);
  const {
    data: destinations,
    error,
    isLoading,
  } = useQuery(["tour", currentPath], () =>
    getAllTourByDestinations(currentPath)
  );
  console.log(currentPath);
  console.log(destinations);
  const { data: destinationss } = useQuery(
    "destinations",
    getAllDestinationsCountry
  );
  const [formData, setFormData] = useState({
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
const userId = localStorage.getItem('id');
console.log(userId); 

const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async (e, userId, tourId) => {
    const token = localStorage.getItem('accessToken');
    e.preventDefault();
    try {
      const response = await axios.post('http://185.170.198.81/api/users/wishlist/tour/toggle',
        {
          tourId: userId,
          userId: tourId,
          isFavorited: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
          Swal.fire('Success', 'Favorite added successfully!', 'success');
          window.location.reload();
      }

      if (response.status === 200) {
        setIsFavorited(!false);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="Destinations">
        <Navbar_Web />
        <div>
          <div className="hero">
            <div className="container">
              <div className="hero-layout">
                <h1>Search By Destination</h1>
                <form>
                  <div className="form-booking">
                    <select onChange={handleChange} name="value">
                      <option>Select</option>
                      {destinationss?.data.map((x) => (
                        <option value={x._id}>{x.destination.country.en}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      className=""
                      placeholder=""
                      name="date"
                    />
                    <Link to={`/Destinations_tours/${formData.value}`}>
                      Find Now
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="popular">
            <div className="container">
              <div className="row">
                {destinations?.data?.map((destination) => (
                  <div className="col-md-4 position-relative" key={destination.id}>
                          <button 
                            onClick={(e) => toggleFavorite(e, destination._id, userId)}
                            className="favorite-button"
                          >
                            {destination.wishlist == false ? (
                              <i className="far fa-heart"></i>
                            ) : (
                              <i className="fa fa-heart"></i>
                            )}
                          </button>
                    <div
                      className="popular-tour"
                      style={{
                        backgroundImage: `url(${Api}/${destination?.image})`,
                        height: "400px",
                      }}
                    >
                      <Link to={`/Tour_details/${destination.id}`}>
                        <div className="popular-layout">
                          <div className="popular-des">
                            <h3>
                              {destination?.title.en}{" "}
                              {/* <strong>${destination.shared}</strong> */}
                            </h3>
                            <div className="d-flex align-items-center">
                              <span>
                                <i className="fa fa-clock"></i>
                                {destination.programdays} Days
                              </span>
                              <span>
                                <i className="fa fa-map"></i>
                                {destination.destination.country.en}
                              </span>
                              <span>
                                <i className="fa fa-star"></i>
                                {destination.destination.rating}
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
          <Partner />
          <Gallery />
        </div>
        <Footer_web />
      </div>
    </>
  );
}

export default Destinations_tours;
