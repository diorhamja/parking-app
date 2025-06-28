import React, {useState, useEffect} from 'react' 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ShowMap from '../components/ShowMap';
import Header from '../components/Header';
import AddSpot from '../components/AddSpot';
import DetailSpot from '../components/DetailSpot';
import Posted from '../components/Posted';
import { useSpots } from '../context/SpotContext';

const Home = () => {
    
    return (
        <div>
            <Header />
            <ShowMap />
        </div>
    );
}

export default Home;