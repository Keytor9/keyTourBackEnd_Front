import React, { useEffect, useState } from "react";
import Navbar_Web from "../Navbar/Navbar";
import about_img from "../Assets/img/image 13.png";
import check from "../Assets/img/Group 8.png";
import italy from "../Assets/img/8f2a938b311626d4ff9b91b3cbf8a4f6.png";
import Maldives from "../Assets/img/86030c9a00056616ee895d7f9bed0b22.png";
import France from "../Assets/img/d7d79b7a2cc3216ac9a9682a5242cb3c.png";
import Greece from "../Assets/img/d96a308b980e8268f79eca9a2382b030.png";
import analysis_single from "../Assets/img/Group 9.png";
import analysis_multi from "../Assets/img/Group 9.png";
import analysis_transfer from "../Assets/img/Group 10.png";
import analysis_activity from "../Assets/img/Group 11.png";
import "../Assets/Css/Web.css";
import Gallery from "./Gallery";
import Partner from "./Partner";
import Footer_web from "../Footer/Footer";
import { Link } from "react-router-dom";
import Api from "../../../services/api";
import { useQuery } from "react-query";
import { getPopular } from "../../../services/apiservices/webService";
import {
  getAllDestinationsCountry,
  updateDestination,
  deleteDestination,
} from "../../../services/apiservices/DestinationService";
import axios from "axios";
import Swal from "sweetalert2";

function Home() {
  const { data: Popular, isLoading, error } = useQuery("Popular", getPopular);

  const { data: destinations } = useQuery(
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


  return (
    <>
      <div className="">
        <Navbar_Web />
        <div>
          <div className="hero">
            <div className="container">
              <div className="hero-layout">
                <h1>explore and live new experiences </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Orci nibh iaculis enim
                  lorem bibendum. Fringilla massa tellus quam sit eget est
                  dignissim diam aliquam.
                </p>
                <form>
                  <div className="form-booking">
                    <select onChange={handleChange} name="value">
                      <option>Select</option>
                      {destinations?.data.map((x) => (
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
                <div className="col-md-12 text-center">
                  <span>CHOOSE YOUR PLACE</span>
                  <h2>Popular Tours</h2>
                </div>
                {Popular?.data.sections.topRatedTours.items.map(
                  (destination) => (
                    <div className="col-md-4" key={destination.id}>
                      <div
                        className="popular-tour"
                        style={{
                          backgroundImage: `url(${Api}/${destination?.image})`,
                          height: "400px",
                        }}
                      >
                        <Link to={`/Tour_details/${destination._id}`}>
                          <div className="popular-layout">
                            <div className="popular-des">
                              <strong>
                                {destination?.room_types[0]?.price}$
                              </strong>
                              <h3>{destination?.title?.en}</h3>
                              <div className="d-flex align-items-center">
                                <span>
                                  <i className="fa fa-clock"></i>
                                  {destination?.programdays} Days
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
                  )
                )}
              </div>
            </div>
          </div>
          <div className="about">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <span>THE BEST TRAVEL AGENCY</span>
                    <h2>Discover The World With Our Guide</h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Orci nibh iaculis
                      enim lorem bibendum. Fringilla massa tellus quam sit eget
                      est dignissim diam aliquam. Bibendum eget lorem mattis
                      mauris ridiculus. Integer platea adipiscing.Lorem ipsum
                      dolor sit amet consectetur. Orci nibh iaculis enim lorem
                      bibendum. Fringilla massa tellus quam sit eget est
                      dignissim diam aliquam. Bibendum eget lorem mattis mauris
                      ridiculus. Integer platea adipiscing.
                    </p>
                    <Link to="/Destinations" className="explore">
                      Explore Now
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="about-img">
                    <img src={about_img} alt="about" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="check">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fa-regular fa-hourglass-half"></i>
                    <h2>Book in less than 2 minutes </h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fa-solid fa-headset"></i>
                    <h2>24/7 to help you </h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fa-solid fa-headset"></i>
                    <h2>Free consultation </h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fa-solid fa-dollar-sign"></i>
                    <h2>Book now and pay only 10%</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="analysis">
            <div className="container">
              <div className="analysis-layout">
                <div className="row">
                  <div className="col-md-3">
                    <div className="text-center d-flex flex-column align-items-center m-3">
                      <img src={analysis_single} alt="analysis_single" />
                      <h2>+600</h2>
                      <span>Single Day Trips </span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center d-flex flex-column align-items-center m-3">
                      <img src={analysis_multi} alt="analysis_multi" />
                      <h2>+250</h2>
                      <span>Multi Day Trip</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center d-flex flex-column align-items-center m-3">
                      <img src={analysis_transfer} alt="analysis_transfer" />
                      <h2>+100</h2>
                      <span>Transfer Trips</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center d-flex flex-column align-items-center m-3">
                      <img src={analysis_activity} alt="analysis_activity" />
                      <h2>+100</h2>
                      <span>Activity Trips</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Gallery />
          <Partner />
        </div>
        <Footer_web />
      </div>
    </>
  );
}

export default Home;
