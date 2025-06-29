import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    IconButton,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useAuth } from '../context/AuthContext';

const CarRegister = () => {
    const { user, setCar } = useAuth();

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!user) {
        setError('No user logged in');
        return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/cars', {
                userId: user._id,
                make,
                model,
                color,
                plate: licensePlate,
            });

            console.log('Registered car:', response.data);
            setCar(response.data)
            navigate('/');
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred during registration.');
            }
        }
    };

    return (
        <Paper
            elevation={10}
            sx={{
            width: '100%',
            maxWidth: 420,
            padding: 5,
            borderRadius: 4,
            backgroundColor: '#fff0f6',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            }}
        >
            <Grid container justifyContent="flex-end">
            <IconButton
                onClick={() => navigate('/')}
                sx={{
                color: '#6a5671',
                transition: '0.3s',
                '&:hover': {
                    color: '#a898af',
                },
                }}
            >
                <HomeRoundedIcon fontSize="medium" />
            </IconButton>
            </Grid>

            <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 550, color: '#6a5671' }}
            >
            Register your car{user?.firstName ? `, ${user.firstName}` : ''} 
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                required
            />

            <TextField
                fullWidth
                margin="normal"
                label="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                required
            />

            <TextField
                fullWidth
                margin="normal"
                label="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                required
            />

            <TextField
                fullWidth
                margin="normal"
                label="License Plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                required
            />

            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
                </Typography>
            )}

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                mt: 3,
                mb: 2,
                py: 1.4,
                backgroundColor: '#6a5671',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#a898af',
                },
                }}
            >
                Add Car
            </Button>
            </Box>
        </Paper>
    );
};

export default CarRegister;
