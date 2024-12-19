import React from "react";
import Navbar_Web from "../Navbar/Navbar";
import who from "../Assets/img/6754d2ee58025f5075ad5900fee15af6.png";
import story from "../Assets/img/7c4485e3a47d89c8161bcd5691c1ca8a.jpeg";
import mission from "../Assets/img/56577db3c25d5e08664c736cd9ae095e.jpeg";
import "../Assets/Css/Web.css";
import Gallery from "./Gallery";
import Partner from "./Partner";
import Footer_web from "../Footer/Footer";
import { useQuery } from "react-query";
import { getAbout } from "../../../services/apiservices/webService";

function About() {
  const { data: about, isLoading2, error2 } = useQuery("about", getAbout);
  console.log(about);
  

  if (isLoading2) return <p>Loading...</p>;
  if (error2) return <p>Error loading data: {error2.message}</p>;

  return (
    <div className="About">
      <Navbar_Web />
      <div className="utility">
        <div className="utility-layout">
          <div className="container">
            <h1>ABOUT US</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
      <div className="story">
        <div className="container">
          <div className="row">
            {about?.data?.map((x, index) => (
              <div key={index} className="row mb-4">
                {index % 2 === 0 ? (
                  <>
                    <div className="col-md-6">
                      <img
                        src={`http://185.170.198.81/${x.image}`}
                        alt={x.title.en}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-6">
                      <h2>{x.title.en}</h2>
                      <p>{x.description.en}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-6">
                      <h2>{x.title.en}</h2>
                      <p>{x.description.en}</p>
                    </div>
                    <div className="col-md-6">
                      <img
                        src={`http://185.170.198.81/${x.image}`}
                        alt={x.title.en}
                        className="img-fluid"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Partner />
      <Gallery />
      <Footer_web />
    </div>
  );
}


export default About;
