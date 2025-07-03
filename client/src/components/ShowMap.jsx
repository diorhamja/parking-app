import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSpots } from '../context/SpotContext';
import { useDrawer } from '../context/DrawerContext';
import DetailSpot from './DetailSpot';
import AddSpot from './AddSpot';
import Posted from './Posted';

const ShowMap = () => {
    
    const { user, car, userLocation } = useAuth();
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
        } else if (!car) {
            navigate('/register/car');
            return;
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
        } else if (!car) {
            navigate('/register/car');
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

    const getPinStyle = (spot) => {
        if (selectedSpot?._id === spot._id) {
            return {
                color: '#ff7cf6',
            };
        }

        if (user?._id === spot.user._id) {
            return {
                color: '#7cedff',
            };
        }

        return {
            color: '#d29fff',
        };
    };


    const BlueDot = () => (
        <div
            style={{
            width: '18px',
            height: '18px',
            backgroundColor: '#00aeff',
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
            mapId={ import.meta.env.VITE_MAP_ID }
            colorScheme="DARK"
            style={{ width: '70vw', height: '80vh' }}
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
                    <LocationOnOutlinedIcon
                    sx={{
                        width: 35,
                        height: 35,
                        color: '#ffc6ec',
                        animation: 'glowPulse 1.8s infinite ease-in-out',
                        '@keyframes glowPulse': {
                        '0%': {
                            filter: 'drop-shadow(0 0 0px #ffc6ec)',
                            transform: 'scale(1)',
                        },
                        '50%': {
                            filter: 'drop-shadow(0 0 12px #ffc6ec)',
                            transform: 'scale(1.2)',
                        },
                        '100%': {
                            filter: 'drop-shadow(0 0 0px #ffc6ec)',
                            transform: 'scale(1)',
                        },
                        },
                    }}
                    />
                </AdvancedMarker>
            )}

            {spots
            .filter((spot) => spot.active)
            .map((spot, index) => {
                const { color } = getPinStyle(spot);
                return (
                <AdvancedMarker
                    key={index}
                    position={{
                    lat: spot.location.coordinates[0],
                    lng: spot.location.coordinates[1],
                    }}
                    onClick={() => handleMarkerClick(spot)}
                    title={spot.description}
                >
                    <LocationOnOutlinedIcon
                    sx={{
                        width: 35,
                        height: 35,
                        color,
                    }}
                    />
                </AdvancedMarker>
                );
            })}

            </Map>
        </APIProvider>
    );
};

export default ShowMap;
