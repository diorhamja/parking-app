import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  TextField, 
  Button, 
  Avatar,
  Divider,
  Paper,
  useTheme
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const EditCar = () => {

    const { car, setCar } = useAuth();

    const [make, setMake] = useState(car.make);
    const [model, setModel] = useState(car.model);
    const [color, setColor] = useState(car.color);
    const [plate, setPlate] = useState(car.plate);

    if (!car) return <Typography>Loading...</Typography>;

    const handleSave = async (e) => {
        e.preventDefault();

        if (!car._id) {
            return console.log(car);
        }

        try {
            const res = await axios.patch(`http://localhost:8000/api/cars/${car._id}`, {
                make: make.trim(),
                model: model.trim(),
                color: color.trim(),
                plate: plate.trim(),
            });
        
            console.log('Car saved:', res.data);
            setCar(res.data);
        } catch (err) {
            console.error('Error saving car:', err.response?.data || err.message);
        }
    }

    return (
        <Paper 
            sx={{ 
            p: 4, 
            bgcolor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(4px)',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
        >
            <Typography variant="h5" fontWeight={600} color="#5E6B8D" gutterBottom>
            My Car Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box
                component="img"
                src={car.image || './car.png'}
                alt="Car"
                sx={{
                    width: '35%',
                    maxHeight: 200,
                    borderRadius: '12px',
                    objectFit: 'cover',
                    mb: 5,
                    display: 'block',
                    margin: '0 auto',
                }}
            />

            <Box sx={{ display: 'flex', gap: 3, mb: 3, mt: 3 }}>
            <TextField
                fullWidth
                label="Make"
                name="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.8)'
                }
                }}
            />
            <TextField
                fullWidth
                label="Model"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.8)'
                }
                }}
            />
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <TextField
                fullWidth
                label="Color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.8)'
                }
                }}
            />
            <TextField
                fullWidth
                label="License Plate"
                name="licensePlate"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.8)'
                }
                }}
            />
            </Box>

            <Button
            variant="contained"
            sx={{
                background: 'linear-gradient(135deg, #B5E8E0, #D4B8F5)',
                color: '#5E6B8D',
                borderRadius: 1,
                px: 4,
                py: 1.5,
                fontWeight: 500,
                '&:hover': {
                background: 'linear-gradient(135deg, #A5D8D1, #C3A8E5)',
                }
            }}
            onClick={handleSave}
            >
            Save Car Details
            </Button>
        </Paper>
    );
}

export default EditCar;