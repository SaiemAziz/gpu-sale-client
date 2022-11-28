import React from 'react';
import { Link } from 'react-router-dom';
import {FaFacebookSquare, FaLinkedin} from 'react-icons/fa'
const Footer = () => {
  let year = new Date().getFullYear();
    return (
        <div className=''>
            <footer className="footer footer-center p-10 bg-base-300 text-info-content">
  <div>
  <Link to='/' className="btn btn-ghost normal-case text-xl font-extrabold hover:bg-base-300">
          <p className="px-3 py-2 text-base-300 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">GPU</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 ml-1">SALE</p>
        </Link>
    <p className="font-bold">
      GPU Sale Industy providing reliable service since 2010
    </p> 
    <p>Copyright © {year} - All right reserved</p>
  </div> 
  <div>
    <div className="grid grid-flow-col gap-4 text-2xl">
      <a target={'_blank'} rel='noreferrer' href='https://www.facebook.com/sayem.azizchowdhury.3/'><FaFacebookSquare/></a>
      <a target={'_blank'} rel='noreferrer' href='https://www.linkedin.com/in/md-abu-saiem-aziz-chowdhury-9b7217247/'><FaLinkedin/></a>
    </div>
  </div>
</footer>   
        </div>
    );
};

export default Footer;