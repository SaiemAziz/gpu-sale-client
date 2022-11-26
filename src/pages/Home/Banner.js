import React from 'react';

const Banner = () => {
    return (
        <div className="card w-full mx-auto bg-base-100 shadow-xl image-full">
            <img className='w-full' src="https://i.ibb.co/W3FfwBc/nana-dua-A1blvx-Jx-GU0-unsplash.jpg" alt="" />
          <div className="card-body">
            <div className='my-auto gap-5 flex flex-col text-white'>
            <h1 className='font-extrabold text-4xl'>!!! Welcome To GPU Sale !!!</h1>
            <p className='text-xl w-4/5 md:w-2/3 my-5 mx-auto hidden sm:block'>Here you can buy or sell GRAPHICS CARDS so easily. <br /> And we provide 100% authentication of the products. <br /> The most trusted company in bangladesh.</p>
            </div>
          </div>
        </div>
    );
};

export default Banner;  