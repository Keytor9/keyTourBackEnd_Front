import React from "react";
import Gallery_1 from "../Assets/img/6d9528b9b3eb56de3c7a949ecf0a6412.png";
import Gallery_2 from "../Assets/img/56577db3c25d5e08664c736cd9ae095e.jpeg";
import Gallery_3 from "../Assets/img/c19556b96dd170216d57a55d20cdc977.png";
import Gallery_4 from "../Assets/img/cd853421162864efd0f07e2d3a804442.png";
import Gallery_5 from "../Assets/img/b102528949a746a4a922f0fdd5476f72.png";
import "../Assets/Css/Web.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";

function Gallery() {
  return (
    <>
      <div className="gallery">
        <div className="container">
          <div className="text-center">
            <span>PHOTO GALLERY</span>
            <h2>Photo’s From Travellers</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper mb-3"
                        style={{
                          height: "220px",
                        }}>
                      <SwiperSlide>
                        <img
                          src={Gallery_1}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_2}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_3}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_4}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <div className="col-md-12">
                  <div>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                          delay: 1500,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper mb-3"
                        style={{
                          height: "220px",
                        }}>
                      <SwiperSlide>
                        <img
                          src={Gallery_2}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_1}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_3}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_4}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper mb-3"
                    style={{
                      height: "456px",
                    }}>
                  <SwiperSlide>
                    <img
                      src={Gallery_3}
                      alt="Gallery"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={Gallery_1}
                      alt="Gallery"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={Gallery_3}
                      alt="Gallery"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={Gallery_2}
                      alt="Gallery"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper mb-3"
                        style={{
                          height: "220px",
                        }}>
                      <SwiperSlide>
                        <img
                          src={Gallery_4}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_1}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_3}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_2}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <div className="col-md-12">
                  <div>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper mb-3"
                        style={{
                          height: "220px",
                        }}>
                      <SwiperSlide>
                        <img
                          src={Gallery_5}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_1}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_4}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={Gallery_2}
                          alt="Gallery"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
