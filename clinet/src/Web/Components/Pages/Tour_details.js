import React from "react";
import Navbar_Web from "../Navbar/Navbar";
import italy from "../Assets/img/8f2a938b311626d4ff9b91b3cbf8a4f6.png";
import Maldives from "../Assets/img/86030c9a00056616ee895d7f9bed0b22.png";
import France from "../Assets/img/d7d79b7a2cc3216ac9a9682a5242cb3c.png";
import Greece from "../Assets/img/d96a308b980e8268f79eca9a2382b030.png";
import Api from '../../../services/api';
import { Link } from "react-router-dom";
import "../Assets/Css/Web.css";
import Gallery from "./Gallery";
import { useParams, useNavigate } from "react-router-dom";
import Partner from "./Partner";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTourById } from '../../../services/apiservices//TourService';
import Footer_web from "../Footer/Footer";
import { Container } from "@chakra-ui/react";

function Tour_details() {
    const { id: currentPath } = useParams(); // Get the id from the route params
    const navigate = useNavigate();
    const { data: destinations, error, isLoading } = useQuery( ["tour", currentPath], () => getTourById(currentPath)
  );

  console.log(destinations);
  

  return (
    <>
      <div className="Destinations">
        <Navbar_Web />
        <div className="tour-details-id">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>{destinations?.data.title.en}</h1>
                <div className="tour-rating mb-3">
                  <span>
                    <i className="fa fa-clock"></i>
                    {destinations?.data.programdays} Days
                  </span>
                  <span>
                    <i className="fa fa-map"></i>
                    {destinations?.data.destination?.city?.en}{" "}
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                    {destinations?.data.destination?.rating} (
                    {destinations?.data.ratings.count} reviews)
                  </span>
                </div>
              </div>
              <div className="col-md-8">
                <img src={`${Api}/${destinations?.data.image}`} />
              </div>
              <div className="col-md-4">
                <div className="booking-details-id">
                  <h2>Booking details</h2>
                  <div className="">
                    <h3>From</h3>
                    <span>{destinations?.data.availability.from 
                          ? new Date(destinations.data.availability.from).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }) 
                          : destinations?.data.availability.from }</span>
                    <h3>To</h3>
                    <span>{destinations?.data.availability.to 
                          ? new Date(destinations.data.availability.to).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }) 
                          : destinations?.data.availability.to }</span>
                  </div>
                  <Link
                    to={`/Booking_details/${destinations?.data.id}`}
                    className="signIn"
                  >
                    BOOK NOW
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="booking-des">
                  <h2>Description</h2>
                  <p>{destinations?.data.brief}</p>
                  <h3>What you will do</h3>
                  <ul>
                    {destinations?.data?.program?.map((x) => (
                      <li>{x?.details}</li>
                    ))}
                  </ul>
                  <h4 className="mt-4">Cancelation</h4>
                  <p>{destinations?.data.cancellation_policy}</p>
                  {/* <h4 className="mt-4">Discounts Offers</h4>
                    {destinations?.data?.discounts?.map((x) => (
                      <li>Min Users:{x?.min_users} Have Discount {x?.discount_percentage}%</li>
                    ))} */}
                </div>
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <div className="booking-des included">
                  <h3 className="mb-3">What is included / Excluded</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <h2>included</h2>
                      <ul>
                        {destinations?.data?.includes?.map((x) => (
                          <li>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h2>Excluded</h2>
                      <ul>
                        {destinations?.data?.excludes?.map((x) => (
                          <li>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <h3 className="mb-3">Reviews</h3>
                  {destinations?.data?.reviews?.map((x) => (
                    <div className="reviews-card">
                      <div className="d-flex align-items-center">
                        <img src={x?.user?.image} />
                        <div>
                          <span>{x?.user?.name}</span>
                        </div>
                      </div>
                      <h4><span>Rating: </span>{x?.rating} <i className="fa fa-star active"></i></h4>
                      <h4>Comment: {x?.comment}</h4>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Footer_web />
      </div>
    </>
  );
}

export default Tour_details;
