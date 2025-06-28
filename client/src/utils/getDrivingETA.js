export const getDrivingETA = ({ origin, destination }) => {
    return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps) {
        reject(new Error('Google Maps JS API not loaded.'));
        return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
        {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            const leg = result.routes[0].legs[0];
            resolve({
            duration: leg.duration.text,
            distance: leg.distance.text,
            raw: leg,
            });
        } else {
            reject(new Error('Failed to fetch directions: ' + status));
        }
        }
    );
    });
};
