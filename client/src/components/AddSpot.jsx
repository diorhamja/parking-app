import {
    Drawer,
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    InputAdornment
} from '@mui/material';
import MyLocationSharpIcon from '@mui/icons-material/MyLocationSharp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
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
    const [timeActive, setTimeActive] = useState(10);
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
        if (!user || !location || !description || !timeActive) return;

        try {
            const res = await axios.post('http://localhost:8000/api/spots', {
                user: user._id,
                description,
                location,
                timeActive
            });
            setSpots([...spots, res.data]);
            setSelectedSpot(res.data);
            console.log(res.data);

            setDescription('');
            setTimeActive(null);
            setLocation(null);
            setAddress(null);
            openDrawer(<Posted />);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        // <Box
        //     sx={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         height: '100%',
        //         p: 2,
        //     }}
        // >
        //     <Box sx={{
        //         display: 'flex',
        //         alignItems: 'center',
        //         width: '100%',
        //         mb: 3,
        //     }}>
        //         <AccountCircleOutlinedIcon 
        //             sx={{ 
        //             width: 45, 
        //             height: 45, 
        //             mr: 3, 
        //             color: '#FFB7C5'
        //             }}
        //         />
        //         <Box sx={{ textAlign: 'left' }}>
        //         <Typography variant="h5" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
        //             {user.firstName} {user.lastName}
        //         </Typography>
        //         </Box>
        //     </Box>

        //     <Typography
        //         variant="h5"
        //         fontWeight={500}
        //         fontFamily="'Rubik', sans-serif"
        //         gutterBottom
        //         sx={{ color: '#' }}
        //     >
        //         Post a New Spot!
        //     </Typography>

        //     <Typography
        //         variant="body2"
        //         sx={{
        //         color: '#',
        //         mb: 2,
        //         fontStyle: 'italic',
        //         fontFamily: "'Rubik', sans-serif",
        //         }}
        //     >
        //         Choose a location on the map or...
        //     </Typography>

        //     <Button
        //         onClick={handleUseCurrentLocation}
        //         variant="outlined"
        //         startIcon={<MyLocationSharpIcon />}
        //         sx={{
        //         textTransform: 'none',
        //         fontWeight: 600,
        //         fontFamily: "'Rubik', sans-serif",
        //         borderColor: '#ffcaa6',
        //         color: '#ffcaa6',
        //         mb: 2,
        //         borderRadius: '12px',
        //         '&:hover': {
        //             backgroundColor: '#ffeee0',
        //             borderColor: '#fdaecb',
        //             color: '#1c2a40',
        //         },
        //         }}
        //     >
        //         Use Current Location
        //     </Button>

        //     {address && (
        //         <Typography
        //         variant="body2"
        //         sx={{
        //             color: '#',
        //             mb: 2,
        //             fontStyle: 'italic',
        //             fontFamily: "'Rubik', sans-serif",
        //         }}
        //         >
        //         {address}
        //         </Typography>
        //     )}

        //     <TextField
        //         fullWidth
        //         multiline
        //         rows={4}
        //         label="Description"
        //         variant="outlined"
        //         value={description}
        //         onChange={(e) => setDescription(e.target.value)}
        //         sx={{
        //         mb: 3,
        //         '& .MuiOutlinedInput-root': {
        //             borderRadius: '12px',
        //             backgroundColor: '#2f415c',
        //             color: 'white'
        //         },
        //         }}
        //     />

        //     <TextField
        //         label="When are you leaving?"
        //         type="number"
        //         value={timeActive}
        //         onChange={(e) => setTimeActive(Number(e.target.value))}
        //         fullWidth
        //         sx={{
        //             '& .MuiOutlinedInput-root': {
        //             borderRadius: '12px',
        //             backgroundColor: '#2f415c',
        //             color: 'white',
        //             },
        //             mb: 3,
        //         }}
        //         InputProps={{
        //             endAdornment: (
        //             <InputAdornment position="end" sx={{ fontFamily: "'Rubik', sans-serif", color: 'white' }}>
        //                 minutes
        //             </InputAdornment>
        //             ),
        //         }}
        //         InputLabelProps={{
        //             shrink: true,
        //             style: { fontFamily: "'Rubik', sans-serif", color: 'white' },
        //         }}
        //     />

        //     <Box mt={2}>
        //         <Button
        //         onClick={handleSubmit}
        //         variant="contained"
        //         fullWidth
        //         disabled={!location || !description}
        //         sx={{
        //             background: 'linear-gradient(135deg, #fdaecb, #ffcaa6)',
        //             color: '#1c2a40',
        //             fontWeight: 600,
        //             fontFamily: "'Rubik', sans-serif",
        //             textTransform: 'none',
        //             borderRadius: '12px',
        //             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        //             '&:hover': {
        //             backgroundColor: '#ffeee0',
        //             color: '#1c2a40',
        //             },
        //         }}
        //         >
        //         Post
        //         </Button>
        //     </Box>
        // </Box>

        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 3,
            }}
        >
            <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                width: '100%',
            }}
            >
            <AccountCircleOutlinedIcon 
                sx={{ 
                width: 40, 
                height: 40, 
                mr: 2, 
                color: '#FFB7C5'
                }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                {user.firstName} {user.lastName}
            </Typography>
            </Box>
    
            <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            sx={{ 
                color: '#5E6B8D',
                mb: 2
            }}
            >
            Post a New Spot!
            </Typography>
    
            <Typography
            variant="body2"
            sx={{
                color: '#7D8BA5',
                mb: 2,
                fontStyle: 'italic'
            }}
            >
            Choose a location on the map or...
            </Typography>
    
            <Button
            onClick={handleUseCurrentLocation}
            variant="outlined"
            startIcon={<MyLocationSharpIcon />}
            sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderColor: '#D4B8F5',
                color: '#5E6B8D',
                mb: 3,
                borderRadius: 1,
                '&:hover': {
                backgroundColor: 'rgba(212, 184, 245, 0.1)',
                borderColor: '#C3A8E5',
                },
            }}
            >
            Use Current Location
            </Button>
    
            {address && (
            <Box
                sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(4px)'
                }}
            >
                <Typography
                variant="body1"
                sx={{
                    color: '#5E6B8D',
                    fontWeight: 500
                }}
                >
                {address}
                </Typography>
            </Box>
            )}
    
            <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: 'rgba(255,255,255,0.8)', 
                '& fieldset': {
                    borderColor: '#D4B8F5', 
                },
                '&:hover fieldset': {
                    borderColor: '#C3A8E5', 
                },
                },
                '& .MuiInputLabel-root': {
                color: '#7D8BA5', 
                },
            }}
            />
    
            <TextField
            label="When are you leaving?"
            type="number"
            value={timeActive}
            onChange={(e) => setTimeActive(Number(e.target.value))}
            fullWidth
            sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: 'rgba(255,255,255,0.8)', 
                '& fieldset': {
                    borderColor: '#D4B8F5',
                },
                '&:hover fieldset': {
                    borderColor: '#C3A8E5',
                },
                },
                '& .MuiInputLabel-root': {
                color: '#7D8BA5',
                },
            }}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end" sx={{ color: '#7D8BA5' }}>
                    minutes
                </InputAdornment>
                ),
            }}
            />
    
            <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            disabled={!location || !description}
            sx={{
                py: 1.5,
                fontWeight: 500,
                background: 'linear-gradient(135deg, #B5E8E0, #D4B8F5)', // Matching gradient
                color: '#5E6B8D',
                borderRadius: 1,
                boxShadow: 'none',
                '&:hover': {
                background: 'linear-gradient(135deg, #A5D8D1, #C3A8E5)',
                },
                '&:disabled': {
                background: 'rgba(181, 232, 224, 0.5)',
                color: 'rgba(94, 107, 141, 0.5)'
                }
            }}
            >
            Post
            </Button>
        </Box>
    );
};

export default AddSpot;
