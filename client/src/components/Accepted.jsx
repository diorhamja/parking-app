import {
    Drawer,
    Box,
    Typography,
    Button,
    Divider,
    IconButton,
    Chip
  } from '@mui/material';
  import MyLocationSharpIcon from '@mui/icons-material/MyLocationSharp';
  import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
  import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
  import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSpots } from "../context/SpotContext";
import { useAccRequest } from '../context/AccRequestContext';
import { useDrawer } from '../context/DrawerContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Finish from './Finish';
import axios from 'axios';

const Accepted = ({ id }) => {

    const { otherUser, otherCar } = useAccRequest();
    const { fetchAddress } = useSpots();
    
    const [isFinishOpen, setIsFinishOpen] = useState(false);
    const [address, setAddress] = useState(null);
    const [request, setRequest] = useState(null);

    useEffect(() => {
        if (otherUser?.location?.coordinates?.length) {
            const getAddress = async () => {
                const lat = otherUser.location.coordinates[0];
                const lng = otherUser.location.coordinates[1];

                const address = await fetchAddress(lat, lng);
                setAddress(address);
            };

            getAddress();
        }
    }, [otherUser]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/requests/${id}`)
            .then(res => {
                console.log('Fetched request:', res.data);
                setRequest(res.data);
            })
            .catch(err => {
                console.error('Error fetching requests:', err.response?.data || err.message);
            })
    }, [id]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 3,
            }}
            >
            <Finish open={isFinishOpen} onClose={() => setIsFinishOpen(false)} />
        
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    mb: 3,
                }}>
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
                {otherUser?.firstName} {otherUser?.lastName}
                </Typography>
                <Chip
                label="Active"
                size="small"
                sx={{
                    mt: 0.5,
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
                src={otherCar?.image}
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

            <Typography 
                variant="body1" 
                mt={2}
                sx={{ 
                fontWeight: 800, 
                color: '#5E6B8D',
                textAlign: 'center',
                mb: 2
                }}
            >
                {otherCar?.plate}
            </Typography>

            <Box 
                sx={{
                p: 1,
                pt: 2,
                mb: 2,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(4px)'
                }}
            >
                <Box display="flex" alignItems="center" width="100%" mb={2}>
                <FmdGoodOutlinedIcon 
                    sx={{ 
                    width: 30, 
                    height: 30, 
                    mr: 3,
                    color: '#B5C7F5' 
                    }} 
                />
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                    Address
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#7D8BA5', mt: 0.5 }}>
                    {address || 'Loading address...'}
                    </Typography>
                </Box>
                </Box>
            </Box>

            <Box 
                sx={{
                p: 1,
                pt: 2,
                mb: 2,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(4px)'
                }}
            >
                <Box display="flex" alignItems="center">
                <DescriptionOutlinedIcon 
                    sx={{ 
                    width: 30, 
                    height: 30, 
                    mr: 3,
                    color: '#D4B8F5' 
                    }} 
                />
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                    Description
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#7D8BA5', mt: 0.5 }}>
                    {request?.spot?.description}
                    </Typography>
                </Box>
                </Box>
            </Box>

            <Button
                variant="contained"
                sx={{
                py: 1.5,
                fontWeight: 500,
                fontSize: '1rem',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #D4B8F5, #B5C7F5)',
                color: '#5E6B8D',
                borderRadius: 1,
                boxShadow: 'none',
                '&:hover': {
                    background: 'linear-gradient(135deg, #C3A8E5, #A5B8E5)',
                },
                }}
                onClick={() => setIsFinishOpen(true)}
            >
                Done!
            </Button>
            </Box>
    );
}

export default Accepted;