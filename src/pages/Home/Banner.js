import React from 'react';

const Banner = () => {
    return (
        <div class="card w-full max-w-4xl mx-auto bg-base-100 shadow-xl image-full">
            <img src="https://images.unsplash.com/photo-1568209865332-a15790aed756?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
  <div class="card-body ">
    <div className='my-auto gap-5 flex flex-col text-white'>
    <h1 className='font-extrabold text-6xl'>!!! Welcome To DP Sale !!!</h1>
    <p className='text-xl w-4/5 md:w-2/3 my-5 mx-auto hidden sm:block'>Here you can buy or sell Desktop Parts so easily. <br /> And we provide 100% authentication of the products. <br /> The most trusted company in bangladesh.</p>
    </div>
  </div>
</div>
    );
};

export default Banner;  