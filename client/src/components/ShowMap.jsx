import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useRef, useEffect } from 'react';

const ShowMap = (props) => {
    
    const { spots, setSelectedSpot, setIsDetailOpen, userLocation, clickedLocation, setClickedLocation, isPosting } = props;
    const mapRef = useRef(null);

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
        const lat = e.detail.latLng.lat;
        const lng = e.detail.latLng.lng;
        const newLocation = { lat, lng };

        setClickedLocation([lat, lng]);
        mapRef.current?.panTo(newLocation);
        mapRef.current?.setZoom(18);
    };

    return (
        <APIProvider apiKey="AIzaSyDA9ei89QNEHdNji9_b2rXJgjLVj8Twpms">
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
            <Pin background="#2196F3" glyphColor="#fff" borderColor="#1976D2" />
            </AdvancedMarker>

            {clickedLocation && isPosting && (
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
                onClick={() => {
                setSelectedSpot(spot);
                setIsDetailOpen(true);
                }}
            >
                <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
            </AdvancedMarker>
            ))}
        </Map>
        </APIProvider>
    );
};

export default ShowMap;
