import React, { useState, useEffect } from 'react';
import SpotContext from './SpotContext';
import axios from 'axios';

const SpotProvider = ({ children }) => {
    const [spots, setSpots] = useState([]);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [selectedSpotCar, setSelectedSpotCar] = useState(null);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [eta, setEta] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/spots')
            .then((res) => {
                console.log(res.data);
                setSpots(res.data);
                setIsLoading(false);
                setRefresh(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
    }, [refresh]);

    useEffect(() => {
        if (selectedSpot) {
            axios.get(`http://localhost:8000/api/cars/user/${selectedSpot.user._id}`)
            .then((res) => {
                console.log(`This is the selected car data ${res.data.image}`);
                setSelectedSpotCar(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
        }
    }, [selectedSpot]);

    const fetchAddress = async (lat, lng) => {
        try {
            const res = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        latlng: `${lat},${lng}`,
                        key: import.meta.env.VITE_API_KEY,
                    },
                }
            );

            if (res.data.status === 'OK') {
                const result =
                    res.data.results.find((r) =>
                        r.types.includes('street_address') ||
                        r.types.includes('premise') ||
                        r.types.includes('route')
                    ) || res.data.results[0];

                return result.formatted_address;
            } else {
                console.error('Geocoding failed:', res.data.status);
            }
        } catch (error) {
            console.error('Error during geocoding:', error);
        }
        return null;
    };

    return (
        <SpotContext.Provider value={{ 
            spots,
            setSpots,
            selectedSpot,
            setSelectedSpot, 
            selectedSpotCar,
            clickedLocation,
            setClickedLocation,
            eta, 
            setEta,
            refresh,
            setRefresh,
            fetchAddress
        }}>
        { 
            !isLoading &&
            children 
        }
        </SpotContext.Provider>
    );
};

export default SpotProvider;
