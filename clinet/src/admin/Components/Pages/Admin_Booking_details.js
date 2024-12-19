// import React, { useState, useEffect, useRef } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import Visa from "../Assets/img/Visa.png";
// import Footer from "../Footer/Footer";
// import ImageGallery from "react-image-gallery";



// function Admin_Booking_details() {
  
//   const images = [
//     {
//       original: "https://picsum.photos/id/1018/1000/600/",
//       thumbnail: "https://picsum.photos/id/1018/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1015/1000/600/",
//       thumbnail: "https://picsum.photos/id/1015/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//   ];
  

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
//                 Dashboard / Tours / <span>Tours details</span>
//               </h2>
//               <div className="requests-status">
//                 <h2>
//                   Booking ID <span>#125484224</span>{" "}
//                   <span className="ms-5"></span> Vendor name{" "}
//                   <span>Ahmed Ali</span>
//                 </h2>
//                 <strong>12/6/2024</strong>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <ImageGallery
//                     items={images}
//                     showPlayButton={false}
//                     showFullscreenButton={false}
//                     infinite={true}
//                     showBullets={false}
//                     autoPlay={true}
//                     showNav={false}
//                   />

//                   <div className="tour-details">
//                     <h2>Customer Information</h2>
//                     <div className="row">
//                       <div className="col-md-12">
//                         <h4>
//                           Additional Notes:
//                           <span>
//                             Lorem ipsum dolor sit amet consectetur. Pulvinar
//                             aliquam fermentum auctor vitae eu fringilla libero
//                             dui.
//                           </span>
//                         </h4>
//                         <h4>
//                           Cancellation Policy:
//                           <div className="">
//                             <span className="mb-1">
//                               Lorem ipsum dolor sit amet consectetur. Pulvinar
//                               aliquam fermentum auctor vitae eu fringilla libero
//                               dui.
//                             </span>
//                           </div>
//                         </h4>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="tour-details">
//                     <h2>Booking Summary</h2>
//                     <div className="row">
//                       <div className="col-md-6">
//                         <h3>
//                           Booking Date: <span>25/5/2024</span>
//                         </h3>
//                         <h3>
//                           Booking Status:
//                           <div className="Confirmed">
//                             <div className="dot"></div> Confirmed
//                           </div>
//                         </h3>
//                         <h3>
//                           Payment Status:
//                           <div className="Paid">
//                             <div className="dot"></div> Paid
//                           </div>
//                         </h3>
//                       </div>
//                       <div className="col-md-6">
//                         <h3>
//                           Total Amount: <span>7852 EGP</span>
//                         </h3>
//                         <h3>
//                           Commission: <span>15%</span>
//                         </h3>
//                         <h3>
//                           Payment Method: <img src={Visa} alt="Visa" />
//                         </h3>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="tour-details">
//                     <h2>Tour Information</h2>
//                     <div className="row">
//                       <div className="col-md-6">
//                         <h4>
//                           Tour Title: <span>Sharm el-Sheikh</span>
//                         </h4>
//                         <h4>
//                           Tour Type: <span>Multi-day</span>
//                         </h4>
//                         <h4>
//                           Number of pax: <span>2</span>
//                         </h4>
//                         <h4>
//                           Program Type: <span>Share</span>
//                         </h4>
//                       </div>
//                       <div className="col-md-6">
//                         <h4>
//                           Tour Date: <span>12/6/2024</span>
//                         </h4>
//                         <h4>
//                           Destination: <span>Egypt</span>
//                         </h4>
//                         <h4>
//                           Tour Language: <span>English</span>
//                         </h4>
//                         <h4>
//                           Room selection <span>Double</span>
//                         </h4>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="tour-details">
//                     <h2>Customer Information</h2>
//                     <div className="row">
//                       <div className="col-md-12">
//                         <h4>
//                           Customer Name: <span>Bilal Ahmed Bekheit</span>
//                         </h4>
//                         <h4>
//                           Contact Information:
//                           <div className="">
//                             <span className="mb-1">
//                               <i className="fa fa-envelope"></i>
//                               belalahmed@gmail.com
//                             </span>
//                             <span>
//                               <i className="fa fa-phone"></i>
//                               +201005218953
//                             </span>
//                           </div>
//                         </h4>
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

// export default Admin_Booking_details;
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Visa from "../Assets/img/Visa.png";
import Footer from "../Footer/Footer";
import ImageGallery from "react-image-gallery";
import { useQuery } from "react-query";
import { getBookingById } from "../../../services/apiservices/bookingService";
import api from "../../../services/api";

import KeyTours from "../../../loadingspinner/KeyTours";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useParams } from "react-router";

function Admin_Booking_details() {

  const {id} = useParams()
  
  const {
    data: bookingData,
    isLoading,
    error,
  } = useQuery(["Booking", id], () => getBookingById(id));



  if (isLoading) return <KeyTours />;
  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      </Box>
    );
  }
console.log(`${api}/${bookingData?.data?.data?.tour?.image}`)
  const images = [
    {
      original: `${api}/${bookingData?.data?.data?.tour?.image}`,
      thumbnail: `${api}/${bookingData?.data?.data?.tour?.image}`,
    },
    // Add more images if necessary
  ];

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
                Dashboard / Tours / <span>Tours details</span>
              </h2>
              <div className="requests-status">
                <h2>
                  Booking ID <span>#{bookingData?.data?.data?._id}</span>{" "}
                  <span className="ms-5"></span> Vendor name{" "}
                  <span>{bookingData?.data?.data?.vendor?.name}</span>
                </h2>
                <strong>{new Date(bookingData?.data?.data?.created_at).toLocaleDateString()}</strong>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <ImageGallery
                    items={images}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    infinite={true}
                    showBullets={false}
                    autoPlay={true}
                    showNav={false}
                  />

                  <div className="tour-details">
                    <h2>Customer Information</h2>
                    <div className="row">
                      <div className="col-md-12">
                        <h4>
                          Customer Name: <span>{bookingData?.data?.data?.user?.name}</span>
                        </h4>
                        <h4>
                          Contact Information:
                          <div className="">
                            <span className="mb-1">
                              <i className="fa fa-envelope"></i> {bookingData?.data?.data?.user?.email}
                            </span>
                            <span>
                              <i className="fa fa-phone"></i> {bookingData?.data?.data?.user?.phone}
                            </span>
                          </div>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tour-details">
                    <h2>Booking Summary</h2>
                    <div className="row">
                      <div className="col-md-6">
                        <h3>
                          Booking Date: <span>{new Date(bookingData?.data?.data?.bookingDate).toLocaleDateString()}</span>
                        </h3>
                        <h3>
                          Booking Status:
                          <div className="Confirmed">
                            <div className="dot"></div> {bookingData?.data?.data?.status}
                          </div>
                        </h3>
                        <h3>
                          Payment Status:
                          <div className="Paid">
                            <div className="dot"></div> {bookingData?.data?.data?.paymentStatus}
                          </div>
                        </h3>
                      </div>
                      <div className="col-md-6">
                        <h3>
                          Total Amount: <span>{bookingData?.data?.data?.totalPrice}</span>
                        </h3>
                        <h3>
                          Commission: <span>{bookingData?.data?.data?.vendor?.commission}%</span>
                        </h3>
                        <h3>
                          Payment Method: <img src={Visa} alt="Visa" />
                        </h3>
                        <h2>
                          downloading the bill: <a href={bookingData?.data?.data?.printurl} download>Click Here</a>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="tour-details">
                    <h2>Tour Information</h2>
                    <div className="row">
                      <div className="col-md-6">
                        <h4>
                          Tour Title: <span>{bookingData?.data?.data?.tour?.title}</span>
                        </h4>
                        <h4>
                          Tour Type: <span>{bookingData?.data?.data?.tour?.tour_type}</span>
                        </h4>
                        <h4>
                          Number of pax: <span>2</span>
                        </h4>
                        <h4>
                          Program Type: <span>{bookingData?.data?.data?.bookingType}</span>
                        </h4>
                      </div>
                      <div className="col-md-6">
                        <h4>
                          Tour Date: <span>{new Date(bookingData?.data?.data?.created_at).toLocaleDateString()}</span>
                        </h4>
                        <h4>
                          Destination: <span>{bookingData?.data?.data?.tour?.destination?.country?.en}</span>
                        </h4>
                        <h4>
                          Tour Language: {bookingData?.data?.data?.tour?.languages?.map((el)=>(

                            <span>{el}</span>
                          ))}
                        </h4>
                        {bookingData?.data?.data?.tour?.tour_type == "multi-day" ? 
                        <h4>
                          Room selection :
                          {bookingData?.data?.data?.rooms?.map((el)=>(
                            <div>
                              <span> roomType: {el?.roomType}</span>
                              <br/>
                              <span> pricePerRoom: {el?.pricePerRoom}</span>
                              <br/>
                              <span> quantity: {el?.quantity}</span>
                              <br/>
                            </div>
                          ))}
                        </h4>
                           : <h4>
                          Type selection :
                          {bookingData?.data?.data?.rooms?.map((el)=>(
                            <div>
                              <span> {el?.roomType}</span>
                              <br/>
                              <span> pricePer{el?.roomType}: {el?.pricePerRoom}</span>
                              <br/>
                              <span> quantity: {el?.quantity}</span>
                              <br/>
                            </div>
                          ))}
                        </h4>}
                      </div>
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

export default Admin_Booking_details;
