import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';

const ErrorPage2 = () => {

    useTitle("Error");
    let err = useRouteError()
    console.log(err)
    return (
<div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 max-w-7xl mx-auto my-20">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0 max-w-">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                Looks like you tried to go to wrong place
                            </h1>
                            <p className="my-5 font-semibold italic text-gray-800">Sorry about that! Please visit our hompage.</p>
                            {/* <Link to='/home' className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Home</Link> */}
                            <Link to='/' className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none "><span
                            className="absolute inset-0 transition-transform scale-110 bg-[#FF6A3D] translate-x-0 translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:scale-100"
                            ></span>
                            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                                Go Home
                            </span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p className='text-9xl text-right font-extrabold text-red-400'>{err.status}</p>
                        <p className=' text-right font-extrabold text-red-400'>{err.statusText}</p>
                        {/* <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt=''/> */}
                    </div>
                </div>
            </div>
            <div>
                <img alt='' src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>
    );
};

export default ErrorPage2;