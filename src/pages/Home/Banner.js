import React from "react";
import MovingComponent from "react-moving-text";

const Banner = () => {
  let title = "!!! Welcome To GPU Sale !!!";
  return (
    <div className="card w-full mx-auto bg-base-100 shadow-xl image-full">
      <img
        className="w-full"
        src="https://i.ibb.co/W3FfwBc/nana-dua-A1blvx-Jx-GU0-unsplash.jpg"
        alt=""
      />
      <div className="card-body">
        <div className="my-auto gap-5 flex flex-col text-white">
          <h1 className="font-extrabold text-success-content text-2xl md:text-4xl lg:text-6xl">
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
