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
} from '@mui/material';

const CarRegister = (props) => {

    const { user } = props;

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
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
                user: user._id,
                make,
                model,
                licensePlate
            });

            console.log('Registered car:', response.data.car);
            navigate('/');

        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred during registration.');
            }
        }
    };

return (
    <Grid container justifyContent="center" alignItems="center" >
        <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
            <Typography variant="h5" align="center" gutterBottom>
            Register your car, { user?.firstName }!
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="Make"
                name="make"
                value={make}
                onChange={e => setMake(e.target.value)}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Model"
                name="model"
                value={model}
                onChange={e => setModel(e.target.value)}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="License Plate"
                name="license"
                value={licensePlate}
                onChange={e => setLicensePlate(e.target.value)}
                required
            />
            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
                </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Add!
            </Button>
            </Box>
        </Paper>
    </Grid>
    );

}

export default CarRegister;