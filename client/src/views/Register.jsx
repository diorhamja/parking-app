import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { useRevalidator } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', user);
    // Add authentication logic here (e.g., API call)
  };

  return (
    <Grid container justifyContent="center" alignItems="center" >
        <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
            <Typography variant="h5" align="center" gutterBottom>
            Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                value={useRevalidator.firstName}
                onChange={handleChange}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                required
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Signup!
            </Button>
            </Box>
        </Paper>
        </Grid>
    );
};

export default Register;
