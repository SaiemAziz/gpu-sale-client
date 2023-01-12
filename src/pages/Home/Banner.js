import React from "react";
import MovingComponent from "react-moving-text";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper";
const Banner = () => {
  let title = "!!! Welcome To GPU Sale !!!";
  return (
    <div className="card w-full rounded-none mx-auto bg-base-100 shadow-xl relative bg-gradient-to-b from-white to-black max-h-screen">

      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper w-full h-full cursor-grab opacity-50"
      >
        <SwiperSlide>
          <img
            className="w-full "
            src="https://images.unsplash.com/photo-1587202372616-b43abea06c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full "
            src="https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full "
            src="https://images.unsplash.com/photo-1634672350437-f9632adc9c3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <div className="card-body absolute z-40 top-1/2 mx-auto w-full backdrop-blur-sm">
        <div className="my-auto gap-5 flex flex-col text-white">
          <h1 className="font-extrabold text-primary-content text-xl sm:text-3xl lg:text-5xl">
            <MovingComponent
              type="slideInFromTop"
              duration="1300ms"
              delay="0s"
              direction="alternate"
              timing="ease-in-out"
              iteration="infinite"
              fillMode="both"
            >
              {title}
            </MovingComponent>
          </h1>
          <p className="text-xl text-blue-200 w-4/5 md:w-2/3 my-5 mt-10 mx-auto hidden sm:block">
            Here you can buy or sell GRAPHICS CARDS so easily. <br /> And we
            provide 100% authentication of the products. <br /> The most trusted
            company in bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
