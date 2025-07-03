import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import RouteRenderer from './RouteRenderer';
import { useSpots } from '../context/SpotContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAccRequest } from '../context/AccRequestContext';

const AcceptedMap = () => {

    const { id } = useParams();
    const { user, userLocation } = useAuth();
    const { otherUser, setOtherUser } = useAccRequest();

    const [request, setRequest] = useState(null);
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});

    useEffect(() => {
        const fetchRequest = async () => {
            if (!id || !user?._id) return;

            try {
                const res = await axios.get(`http://localhost:8000/api/requests/${id}`);
                setRequest(res.data);
                setOrigin({ lat: res.data.spot.location.coordinates[0], lng: res.data.spot.location.coordinates[1] });
                const { fromUser, toUser } = res.data;

                let other = null;

                if (fromUser._id === user._id) {
                    other = toUser;
                        setDestination({ lat: userLocation[0], lng: userLocation[1] });
                } else if (toUser._id === user._id) {
                    other = fromUser;
                        setDestination({ lat: other.location.coordinates[0], lng: other.location.coordinates[1] });
                }

                if (other) {
                    setOtherUser(other);
                    console.log('This is the other user', other);

                } else {
                    console.warn('Logged-in user is not part of this request.');
                }
            } catch (err) {
                console.error('Error fetching request:', err);
            }
        };

        fetchRequest();
    }, [id, user]);

    if (!userLocation || userLocation.length < 2 || !request || !otherUser) {
        return <p>Loading map...</p>;
    }

    return (
        <APIProvider apiKey={ import.meta.env.VITE_API_KEY } >
        <Header acceptedComponent={true} />
        <Map
            mapId={ import.meta.env.VITE_MAP_ID }
            colorScheme="DARK"
            style={{ width: '70vw', height: '80vh' }}
            defaultCenter={ origin }
            defaultZoom={12}
            gestureHandling="greedy"
            disableDefaultUI
        >

            {
                request &&
                <>
                    <AdvancedMarker 
                    position={ origin } >
                        <div
                            style={{
                            width: '40px',
                            height: '40px',
                            backgroundImage: 'url("/location2.png")',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center' }}
                        />
                    </AdvancedMarker>
                    <AdvancedMarker position={ destination }>
                        <div
                            style={{
                            width: '40px',
                            height: '40px',
                            backgroundImage: 'url("/car-icon2.png")',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center' }}
                        />
                    </AdvancedMarker>
                </>
            }

                <RouteRenderer
                origin={origin}
                destination={destination}
                />

            </Map>
        </APIProvider>
    );
}

export default AcceptedMap;