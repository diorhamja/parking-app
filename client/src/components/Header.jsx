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
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none',
                borderRadius: '20px 20px 0 0',
                paddingX: 2,
            }}
            >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" onClick={() => {
                    setRefresh(true)
                    navigate('/')
                }}>
                <Avatar
                    src="/logo.png"
                    alt="Aura Logo"
                    sx={{ width: 40, height: 40, mr: 1 }}
                />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                    fontFamily: '"Pacifico", cursive',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: '#1c2a40',
                    }}
                >
                    Aura
                </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>

                {
                    user &&
                    <Typography
                        onClick={() => {
                            navigate('/account')
                        }}
                        variant="p"
                        component="div"
                        sx={{
                        fontStyle: 'italic',
                        color: '#1c2a40',
                        }}
                    >
                        Hi, { user.firstName }
                    </Typography>
                }

                <IconButton
                    onClick={() => {
                        if (acceptedComponent) {
                            return openDrawer(<Accepted />);
                        }
                    
                        if (user) {
                            return openDrawer(<AddSpot />);
                        }
                    
                        navigate('/login');
                    }}
                    sx={{
                    color: '#1c2a40',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    }
                    }}
                >
                    <AddCircleOutlineIcon />
                </IconButton>

                {
                    !user &&
                    <Button
                        sx={{
                        color: '#1c2a40',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontFamily: '"Quicksand", sans-serif',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        }
                        }}
                        startIcon={<LoginIcon />}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
