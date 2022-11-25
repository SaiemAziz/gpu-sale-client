import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import Advertise from './Advertise';
import Banner from './Banner';
import Categories from './Categories';

const Home = () => {
    useTitle('Home')
    return (
        <div>
           <Banner/>
           <Advertise/>
           <Categories/>
        </div>
    );
};

export default Home;