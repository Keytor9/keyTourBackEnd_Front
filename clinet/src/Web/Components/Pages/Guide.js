import React from "react";
import Navbar_Web from "../Navbar/Navbar";
import Guide_img from "../Assets/img/269aaa05cf523ad8940f7bdd4dc9f59e.jpeg";
import story from "../Assets/img/7c4485e3a47d89c8161bcd5691c1ca8a.jpeg";
import mission from "../Assets/img/56577db3c25d5e08664c736cd9ae095e.jpeg";
import "../Assets/Css/Web.css";
import Gallery from "./Gallery";
import Partner from "./Partner";
import Footer_web from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getGuide } from "../../../services/apiservices/webService";

function Guide() {
  const { data: guide, isLoading, error } = useQuery("guide", getGuide);
  console.log(guide);
  return (
    <>
      <div className="About">
        <Navbar_Web />
        <div>
          <div className="utility">
            <div className="utility-layout">
              <div className="container">
                <h1>Travel Guide</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis sit aliquam sit nullam.
                </p>
              </div>
            </div>
          </div>
          <div className="guide">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <span>08.08.2021</span>
                    <div className="slash"></div>
                    <span>08.08.2021</span>
                  </div>
                </div>
                <div className="col-md-9">
                  <div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsupecimen book. It has survived not only five centuries,
                      but also the leap into electronic typesetting, remaining
                      essentially unchanged. It was popularised in the 1960s
                      with the release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      men book. It has survived not only five centuries, but
                      also the leap into electronic typesetting, remaining
                      essentially unchanged. It was popularised in the 1960s
                      with the release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                    <h2>“Lorem Ipsum is simply dummy text of the printing ”</h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="Guide"
            style={{
              backgroundImage: `url(${Guide_img})`,
            }}
          >
            <div className="container">
              <div className="Guide-layout">
                <h2>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the
                </h2>
                <p>
                  Progressively incentivize cooperative systems through
                  technically sound functionalities. The credibly productivate
                  seamless data.
                </p>
                <div className="slash"></div>
                <span>08.08.2021</span>
              </div>
            </div>
          </div>
          <Gallery />
        </div>
        <Footer_web />
      </div>
    </>
  );
}

export default Guide;
