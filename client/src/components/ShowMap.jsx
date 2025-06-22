import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSpots } from '../context/SpotContext';
import { useDrawer } from '../context/DrawerContext';
import DetailSpot from './DetailSpot';
import AddSpot from './AddSpot';
import Posted from './Posted';

const ShowMap = () => {
    
    const { user, userLocation } = useAuth();
    const { spots, selectedSpot, setSelectedSpot, clickedLocation, setClickedLocation } = useSpots();
    const { openDrawer } = useDrawer();

    const mapRef = useRef(null);
    const navigate = useNavigate();

    const onMapLoad = (map) => {
        mapRef.current = map;

        if (userLocation) {
        const center = { lat: userLocation[0], lng: userLocation[1] };
        map.panTo(center);
        map.setZoom(18);
        }
    };

    useEffect(() => {
        if (userLocation && mapRef.current) {
        const center = { lat: userLocation[0], lng: userLocation[1] };
        mapRef.current.panTo(center);
        mapRef.current.setZoom(18);
        }
    }, [userLocation]);

    const handleMapClick = (e) => {
        if (!user) {
            navigate('/login')
        } else {
            const lat = e.detail.latLng.lat;
            const lng = e.detail.latLng.lng;
            const newLocation = { lat, lng };
    
            setClickedLocation([lat, lng]);
            mapRef.current?.panTo(newLocation);
            mapRef.current?.setZoom(18);
            openDrawer(<AddSpot />);
        }
    };

    const handleMarkerClick = (spot) => {
        if (!user) {
            navigate('/login');
            return;
        }

        setSelectedSpot(spot);
        setClickedLocation(null);

        if (spot.user._id == user._id) {
            openDrawer(<Posted />);
        } else {
            openDrawer(<DetailSpot />);
        }
    };

    const getPinColor = (spot) => {
        if (selectedSpot?._id === spot._id) return '#6a4c93'; // purple for selected
        if (user?._id === spot.user._id) return '#54f542'; // green for own posts
        return '#FBBC04'; // yellow for others
    };    

    const BlueDot = () => (
        <div
            style={{
            width: '14px',
            height: '14px',
            backgroundColor: '#2196F3',
            borderRadius: '50%',
            boxShadow: '0 0 8px #2196F3',
            }}
        />
    );

    return (
        <APIProvider apiKey={ import.meta.env.VITE_API_KEY } >
        <Map
            onLoad={onMapLoad}
            onClick={handleMapClick}
            mapId="3fbd2f5a3b7758a1b581079d"
            colorScheme="DARK"
            style={{ width: '80vw', height: '80vh' }}
            defaultCenter={{ lat: userLocation[0], lng: userLocation[1] }}
            defaultZoom={15}
            gestureHandling="greedy"
            disableDefaultUI
        >
            <AdvancedMarker position={{ lat: userLocation[0], lng: userLocation[1] }}>
            <BlueDot />
            </AdvancedMarker>

            {clickedLocation && (
                <AdvancedMarker position={{ lat: clickedLocation[0], lng: clickedLocation[1] }}>
                    <Pin background="#ff4081" glyphColor="#fff" borderColor="#d81b60" />
                </AdvancedMarker>
            )}

            {spots.map((spot, index) => (
                <AdvancedMarker
                    key={index}
                    position={{
                        lat: spot.location.coordinates[0],
                        lng: spot.location.coordinates[1],
                    }}
                    onClick={() => handleMarkerClick(spot)}
                    title={spot.description} // replace with time!!
                >
                    <Pin background={getPinColor(spot)} glyphColor="#000" borderColor="#000" />
                </AdvancedMarker>
            ))}
            </Map>
        </APIProvider>
    );
};

export default ShowMap;
