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
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const EditProfile = () => {

    const { user, setUser, logout } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!user._id) {
            return;
        }

        try {
            const res = await axios.patch(`http://localhost:8000/api/users/${user._id}`, {
                firstName,
                lastName,
                email,
            }, { withCredentials: true });
        
            console.log('User saved:', res.data);
            setUser(res.data);
        } catch (err) {
            console.error('Error saving user:', err.response?.data || err.message);
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();

        logout(user);
        navigate('/');
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
            Account Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.8)'
                }
                }}
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.8)'
                }
                }}
            />
            </Box>

            <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                bgcolor: 'rgba(255,255,255,0.8)'
                }
            }}
            />

            <Button
            variant="contained"
            sx={{
                background: 'linear-gradient(135deg, #B5E8E0, #D4B8F5)',
                color: '#5E6B8D',
                borderRadius: 1,
                mb: 2,
                px: 4,
                py: 1.5,
                fontWeight: 500,
                '&:hover': {
                background: 'linear-gradient(135deg, #A5D8D1, #C3A8E5)',
                }
            }}
            onClick={handleSave}
            >
            Save Changes
            </Button>

            <br />

            <Button
                variant='outlined'
                onClick={handleLogout}
                sx={{
                    borderColor: '#7D8BA5',
                    color: '#7D8BA5'
                }}
            >
                <LogoutOutlinedIcon />
                Logout
            </Button>
        </Paper>
    )
}

export default EditProfile;