import React from 'react';
import Advertise from './Advertise';
import Banner from './Banner';
import Categories from './Categories';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Advertise/>
           <Categories/>
        </div>
    );
};

export default Home;