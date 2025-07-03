import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDrawer } from '../context/DrawerContext';
import AddSpot from './AddSpot';
import Accepted from './Accepted';
import { useSpots } from '../context/SpotContext';

const Header = ({ acceptedComponent }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { openDrawer } = useDrawer();
    const { setRefresh } = useSpots();

    return (
        <AppBar
        position="static"
        elevation={0}
        sx={{
            width: '70vw',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px 20px 0 0',
            paddingX: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
        >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
                setRefresh(true);
                navigate('/');
            }}
            >
            <Avatar
                src="/logo.png"
                alt="Aura Logo"
                sx={{ width: 40, height: 40, mr: 1 }}
            />
            <Typography
                variant="h6"
                sx={{
                fontFamily: '"Pacifico", cursive',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#1c2a40',
                userSelect: 'none',
                }}
            >
                Aura
            </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
            {user && (
                <Typography
                onClick={() => navigate('/account')}
                sx={{
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: '0.95rem',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    color: '#1c2a40',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                    color: '#6a4c93',
                    },
                }}
                >
                Hi, {user.firstName}
                </Typography>
            )}

            <IconButton
                onClick={() => {
                if (acceptedComponent) return openDrawer(<Accepted />);
                if (user) return openDrawer(<AddSpot />);
                navigate('/login');
                }}
                sx={{
                color: '#1c2a40',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: '#ffcaa6',
                },
                }}
            >
                <AddCircleOutlineIcon />
            </IconButton>

            {!user && (
                <Button
                startIcon={<LoginIcon />}
                onClick={() => navigate('/login')}
                sx={{
                    color: '#1c2a40',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: '"Quicksand", sans-serif',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    paddingX: 2,
                    '&:hover': {
                    backgroundColor: '#ffcaa6',
                    },
                }}
                >
                Login
                </Button>
            )}
            </Box>
        </Toolbar>
        </AppBar>
    );
};

export default Header;
