import {
    Drawer,
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
} from '@mui/material';
import MyLocationSharpIcon from '@mui/icons-material/MyLocationSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSpot = (props) => {
    
    const {
        isAddOpen,
        setIsAddOpen,
        spots,
        setSpots,
        userLocation,
        clickedLocation,
        user,
        setIsPostedOpen,
        setSelectedSpot
    } = props;

    const [description, setDescription] = useState('');
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (clickedLocation) {
            const [lat, lng] = clickedLocation;
            setLocation({ type: 'Point', coordinates: [lat, lng] });
            fetchAddress(lat, lng);
        }
    }, [clickedLocation]);

    const fetchAddress = async (lat, lng) => {
        try {
            const res = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        latlng: `${lat},${lng}`,
                        key: import.meta.env.VITE_API_KEY,
                    },
                }
            );

            if (res.data.status === 'OK') {
                const result =
                    res.data.results.find((r) =>
                        r.types.includes('street_address') ||
                        r.types.includes('premise') ||
                        r.types.includes('route')
                    ) || res.data.results[0];

                setAddress(result.formatted_address);
            } else {
                console.error('Geocoding failed:', res.data.status);
                setAddress(null);
            }
        } catch (error) {
            console.error('Error during geocoding:', error);
            setAddress(null);
        }
    };

    const handleUseCurrentLocation = () => {
        const [lat, lng] = userLocation;
        setLocation({ type: 'Point', coordinates: [lat, lng] });
        fetchAddress(lat, lng);
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
            setIsAddOpen(false);
            setIsPostedOpen(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Drawer
            anchor="right"
            open={isAddOpen}
            variant="persistent"
            onClose={() => {
                setIsAddOpen(false);
                setAddress(null);
            }}
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
            <Box
                sx={{
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '85%',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <IconButton
                        onClick={() => {
                            setIsAddOpen(false);
                            setAddress(null);
                        }}
                        sx={{ color: '#6a4c93', right: '-160px' }}
                    >
                        <CloseSharpIcon />
                    </IconButton>

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
                </Box>

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
            </Box>
        </Drawer>
    );
};

export default AddSpot;
