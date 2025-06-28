import { useEffect, useState } from 'react';
import { useMap, AdvancedMarker } from '@vis.gl/react-google-maps';

const RouteRenderer = ({ origin, destination }) => {
    const map = useMap();
    const [ETAInfo, setETAInfo] = useState(null);

    useEffect(() => {
        if (!map || !origin || !destination) return;

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
            strokeColor: '#51ffdf',
            strokeWeight: 7,
        },
        });

        directionsRenderer.setMap(map);

        directionsService.route(
        {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            const leg = result.routes[0].legs[0];
            const duration = leg.duration.text;

            const midPoint = result.routes[0].overview_path[
                Math.floor(result.routes[0].overview_path.length / 2)
            ];

            setETAInfo({
                duration,
                position: { lat: midPoint.lat(), lng: midPoint.lng() },
            });
            } else {
            console.error('Directions request failed:', status);
            }
        }
        );

        return () => {
        directionsRenderer.setMap(null);
        };
    }, [map, origin, destination]);

    return (
        <>
        {ETAInfo && (
            <AdvancedMarker position={ETAInfo.position}>
            <div style={{
                background: '#fff0f6',
                color: '#6a5671',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap',
            }}>
                {ETAInfo.duration}
            </div>
            </AdvancedMarker>
        )}
        </>
    );
};

export default RouteRenderer;
