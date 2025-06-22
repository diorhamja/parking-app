import {
    Drawer,
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    useStepContext,
} from '@mui/material';
import MyLocationSharpIcon from '@mui/icons-material/MyLocationSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useSpots } from '../context/SpotContext';
import { useDrawer } from '../context/DrawerContext';
import Posted from './Posted';

const AddSpot = () => {

    const { user, userLocation } = useAuth();
    const { spots, setSpots, setSelectedSpot, clickedLocation, fetchAddress } = useSpots();
    const { openDrawer } = useDrawer();

    const [description, setDescription] = useState('');
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (clickedLocation) {
            const [lat, lng] = clickedLocation;
            setLocation({ type: 'Point', coordinates: [lat, lng] });
            
            const getAddress = async () => {
                const address = await fetchAddress(lat, lng);
                setAddress(address);
            };
        
            getAddress();
        }
    }, [clickedLocation]);

    const handleUseCurrentLocation = async () => {
        const [lat, lng] = userLocation;
        setLocation({ type: 'Point', coordinates: [lat, lng] });
        
        const address = await fetchAddress(lat, lng);
        setAddress(address);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !location || !description) return;

        try {
            const res = await axios.post('http://localhost:8000/api/spots', {
                user: user._id,
                description,
                location,
            });
            setSpots([...spots, res.data]);
            setSelectedSpot(res.data);
            console.log(res.data);

            setDescription('');
            setLocation(null);
            setAddress(null);
            openDrawer(<Posted />);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Typography
                variant="h5"
                fontWeight="bold"
                fontFamily="'Quicksand', sans-serif"
                gutterBottom
                sx={{ color: '#6a4c93' }}
            >
                Post a New Spot, {user.firstName}
            </Typography>

            <Typography
                variant="body2"
                sx={{ color: '#333', mb: 2, fontStyle: 'italic' }}
            >
                Choose a location on the map or...
            </Typography>

            <Button
                onClick={handleUseCurrentLocation}
                variant="outlined"
                startIcon={<MyLocationSharpIcon />}
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
                Use Current Location
            </Button>

            {address && (
                <Typography
                    variant="body2"
                    sx={{ color: '#333', mb: 2, fontStyle: 'italic' }}
                >
                    {address}
                </Typography>
            )}

            <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                variant="outlined"
                sx={{ mb: 3 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
                label="When are you leaving?"
                type="time"
                InputLabelProps={{ shrink: true }}
                fullWidth
            />

        <Box mt={3}>
            <Button
                onClick={handleSubmit}
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
                disabled={!location || !description}
            >
                Post
            </Button>
        </Box>
    </>

    );
};

export default AddSpot;
