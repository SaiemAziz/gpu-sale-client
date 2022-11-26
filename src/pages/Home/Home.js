import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import Advertise from './Advertise';
import Banner from './Banner';
import Categories from './Categories';
import ExtraSection from './ExtraSection';

const Home = () => {
    useTitle('Home')
    return (
        <div>
           <Banner/>
           <Advertise/>
           <Categories/>
           <ExtraSection/>
        </div>
    );
};

export default Home;