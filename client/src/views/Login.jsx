import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Link,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email,
        password,
      });

      login(response.data.user);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during login.');
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
            href="/"
            sx={{
              color: '#1c2a40',
              transition: '0.3s',
              '&:hover': {
                color: '#506079',
              },
            }}
          >
            <HomeRoundedIcon fontSize="medium" />
          </IconButton>
        </Grid>

        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 550, color: '#1c2a40' }}
        >
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
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
              backgroundColor: '#1c2a40',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#506079',
              },
            }}
          >
            Login
          </Button>

          <Typography align="center" variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/register" underline="hover" sx={{ color: '#0e58d8' }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
  );
};

export default Login;
