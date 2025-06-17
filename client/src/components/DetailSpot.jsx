import {
    Drawer,
    Box,
    Typography,
    Button,
    Divider,
    IconButton,
  } from '@mui/material';
  import MyLocationSharpIcon from '@mui/icons-material/MyLocationSharp';
  import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DetailSpot = (props) => {

    const {isDetailOpen, setIsDetailOpen, id} = props;
    const [spot, setSpot] = useState({});
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const fetchSpot = async () => {
        try {
        const res = await axios.get('http://localhost:8000/api/spots/' + id);
        setSpot(res.data);
        console.log(res.data)
        } catch (err) {
        console.log(err);
        }
    };
    
    fetchSpot();
    }, [id]);

    const handleUseLocation = async () => {
        const lat = spot.location.coordinates[0];
        const lng = spot.location.coordinates[1];

        try {
        const res = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
            params: {
                latlng: `${lat},${lng}`,
                key: process.env.API_KEY,
            },
            }
        );

        if (res.data.status === 'OK') {
            const result = res.data.results.find(r =>
            r.types.includes('street_address') ||
            r.types.includes('premise') ||
            r.types.includes('route')
            ) || res.data.results[0];

            const fullAddress = result.formatted_address;
            setAddress(fullAddress);
        } else {
            console.error('Geocoding failed:', res.data.status);
            setAddress(null);
        }
        } catch (error) {
        console.error('Error during geocoding:', error);
        setAddress(null);
        }
    };

    useEffect(() => {
        if (spot?.location?.coordinates?.length) {
            handleUseLocation();
        }
    }, [spot]);

    return(
        <div>
            <Drawer
                anchor="right"
                open={isDetailOpen}
                onClose={() => {setIsDetailOpen(false)}}
                PaperProps={{
                    sx: {
                    width: '30vw',
                    borderTopLeftRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    padding: 3,
                    backgroundColor: '#fff0f5',
                    },
                }}
                >
                <IconButton
                    onClick={() => {setIsDetailOpen(false)}}
                    sx={{color: '#6a4c93', justifyContent: 'right'}}
                >
                    <CloseSharpIcon />
                </IconButton>

                <Typography variant="h5" fontWeight="bold" fontStyle="italic" mb={2}>
                    { spot.user?.firstName }
                </Typography>

                <Box
                    component="img"
                    src="../car.png"
                    alt="Car"
                    sx={{
                    width: '100%',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    mb: 2,
                    }}
                />

                {!address ? (
                <Typography variant="body2" color="text.secondary" mb={1}>
                    Loading address...
                </Typography>
                ) : (
                <Typography variant="body1" mb={1}>
                    {address}
                </Typography>
                )}

                <Typography variant="body2" mb={2}>
                    {spot.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" color="text.secondary" mb={3}>
                    Leaving in... 10 minutes
                </Typography>

                <Button
                    onClick={() => {setIsDetailOpen(false)}}
                    variant="contained"
                    fullWidth
                    sx={{
                    backgroundColor: '#ff80ab',
                    textTransform: 'none',
                    borderRadius: '12px',
                    '&:hover': {
                        backgroundColor: '#f06292',
                    },
                    }}
                >
                    Request
                </Button>
                </Drawer>
        </div>
    );
}

export default DetailSpot;