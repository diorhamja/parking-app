import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Register = () => {

  const { login, userLocation } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const [lat, lng] = userLocation;
    const location =({ type: 'Point', coordinates: [lat, lng] })
    
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', {
        firstName,
        lastName,
        email,
        password,
        location
      });

      console.log('Registered user:', response.data.user);
      login(response.data.user);

      navigate('/register/car');

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
            Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Signup!
            </Button>
            </Box>
        </Paper>
        <Link href="/" underline="none">
          Go Home
        </Link>
      </Grid>
    );
};

export default Register;
