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
import { useAuth } from '../context/AuthContext';
import { useSpots } from '../context/SpotContext';
import { useDrawer } from '../context/DrawerContext';
import Posted from './Posted';

const DetailSpot = () => {

    const { user } = useAuth();
    const { selectedSpot, fetchAddress } = useSpots();

    const [spot, setSpot] = useState({});
    const [address, setAddress] = useState(null);
    const [request, setRequest] = useState(null);

    useEffect(() => {
        if (!spot?._id || !user?._id) return;

        axios.get(`http://localhost:8000/api/requests/spot/${spot._id}`)
            .then(res => {
                const allRequests = res.data;
                const userRequest = allRequests.find(r => r.fromUser._id === user._id);
        
                if (userRequest) {
                    console.log('User has already made a request:', userRequest);
                    setRequest(userRequest);
                } else {
                    setRequest(null);
                }
            })
            .catch(err => {
                console.error('Error fetching requests:', err.response?.data || err.message);
            });
    }, [spot, user]);

    useEffect(() => {
        if (!selectedSpot) return;
        const fetchSpot = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/spots/' + selectedSpot._id);
            setSpot(res.data);
            console.log(res.data)
        } catch (err) {
            console.log(err);   
        }
    };
    
    fetchSpot();
    }, [selectedSpot]);

    useEffect(() => {
        if (spot?.location?.coordinates?.length) {
            const getAddress = async () => {
                const lat = spot.location.coordinates[0];
                const lng = spot.location.coordinates[1];

                const address = await fetchAddress(lat, lng);
                setAddress(address);
            };

            getAddress();
        }
    }, [spot]);

    const handleRequest = () => {
        axios.post('http://localhost:8000/api/requests/', {
            spot: spot._id,
            fromUser: user._id,
            toUser: spot.user?._id
        })
        .then(res => {
            console.log('Request', res.data)
            setRequest(res.data)
        })
        .catch(err => {
            console.error('Error creating request', err.response?.data || err.message);
        })
    }

    return(
        <>
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

        {
            !request &&
            <Button
                onClick={() => {
                    handleRequest()
                }}
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
        }
        {
            request &&
            <Button
                variant="outlined"
                sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: '#6a4c93',
                    color: '#6a4c93',
                    mb: 1.5,
                    '&:hover': {
                        backgroundColor: '#f3e8ff',
                        borderColor: '#5e548e',
                        color: '#5e548e',
                    },
                }}
            >
                Request {request.status}
            </Button>
        }
        </>
    );
}

export default DetailSpot;