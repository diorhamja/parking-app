import {
    Drawer,
    Box,
    Typography,
    Button,
    Divider,
    IconButton,
    Chip,
    useTheme
  } from '@mui/material';
  import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
  import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
  import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
  import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useAuth } from '../context/AuthContext';
  import { useSpots } from '../context/SpotContext';
  import { useDrawer } from '../context/DrawerContext';
  import Posted from './Posted';
  import { useNavigate } from 'react-router-dom';
  import Accepted from './Accepted';

const DetailSpot = () => {

    const navigate = useNavigate();

    const { user } = useAuth();
    const { selectedSpot, selectedSpotCar, fetchAddress, refresh, setRefresh } = useSpots();
    const { openDrawer } = useDrawer();

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

    useEffect(() => {
        if (request) {
            axios.get('http://localhost:8000/api/requests/' + request._id)
                .then(res => {
                    if (res.data.status == 'accepted') {
                        console.log('Request accepted')

                        setRefresh(false);
                        navigate(`/accepted/${request._id}`);
                        openDrawer(<Accepted id={request._id} />);
                    }
                })
                .catch(err => {
                    console.error('Error creating request', err.response?.data || err.message);
                })
        }
    }, [request, refresh]);

    return(
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 2,
            }}
        >
            <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                mb: 3,
            }}
            >
            <AccountCircleOutlinedIcon 
                sx={{ 
                width: 45, 
                height: 45, 
                mr: 3, 
                color: '#FFB7C5'
                }} 
            />
            <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                {spot.user?.firstName} {spot.user?.lastName}
                </Typography>
                <Chip
                label="Active"
                size="small"
                sx={{
                    mt: 1,
                    color: 'white',
                    bgcolor: '#A5D8D1',
                }}
                icon={
                    <Box 
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                        }}
                    />
                }
                />
            </Box>
            </Box>

            <Box
                component="img"
                src={selectedSpotCar?.image}
                alt="Car"
                sx={{
                    width: '80%',
                    maxHeight: 200,
                    borderRadius: '12px',
                    objectFit: 'cover',
                    mb: 5,
                    display: 'block',
                    margin: '0 auto',
                }}
            />
    
            <Box 
            sx={{
                mt: 3,
                mb: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            >

            <Box display="flex" alignItems="center" width="100%" mb={2}>
                <FmdGoodOutlinedIcon sx={{ 
                width: 30, 
                height: 30, 
                mr: 3, 
                color: '#B5C7F5'
                }} />
                <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                    Address
                </Typography>
                <Typography variant="body1" sx={{ color: '#7D8BA5', mt: 0.5 }}>
                    {address || 'Loading address...'}
                </Typography>
                </Box>
            </Box>
    
            <Box display="flex" alignItems="center" width="100%" mb={2}>
                <DescriptionOutlinedIcon sx={{ 
                width: 30, 
                height: 30, 
                mr: 3, 
                color: '#D4B8F5'
                }} />
                <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                    Description
                </Typography>
                <Typography variant="body1" sx={{ color: '#7D8BA5', mt: 0.5 }}>
                    {spot.description}
                </Typography>
                </Box>
            </Box>
    
            <Box display="flex" alignItems="center" width="100%" mb={2}>
                <AccessTimeOutlinedIcon sx={{ 
                width: 30, 
                height: 30, 
                mr: 3, 
                color: '#FFD8B8'
                }} />
                <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                    Leaving in...
                </Typography>
                <Typography variant="body1" sx={{ color: '#7D8BA5', mt: 0.5 }}>
                    <Box component="span" sx={{ color: '#FFA98E', fontWeight: 600 }}>
                    {spot.timeActive}
                    </Box> minutes
                </Typography>
                </Box>
            </Box>
            </Box>
    
            <Box sx={{ mt: 2 }}>
            {!request ? (
                <Button
                onClick={handleRequest}
                variant="contained"
                fullWidth
                sx={{
                    py: 1.5,
                    fontWeight: 500,
                    fontSize: '1rem',
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #B5E8E0, #D4B8F5)',
                    color: '#5E6B8D',
                    borderRadius: 1,
                    boxShadow: 'none',
                    '&:hover': {
                    background: 'linear-gradient(135deg, #A5D8D1, #C3A8E5)',
                    },
                }}
                >
                Request Spot
                </Button>
            ) : (
                <Button
                onClick={() => setRefresh(true)}
                variant="outlined"
                fullWidth
                sx={{
                    py: 1.5,
                    fontWeight: 500,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: 1,
                    borderColor: 'linear-gradient(135deg, #FFE0B5, #FFD1DC)',
                    color: '#5E6B8D',
                    boxShadow: 'none',
                }}
                >
                Request {request.status}
                </Button>
            )}
            </Box>
        </Box>
    );
}

export default DetailSpot;