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

const Header = (props) => {
    const navigate = useNavigate();

    const { setIsAddOpen, user } = props;

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none',
                borderRadius: '20px 20px 0 0',
                paddingX: 2,
            }}
            >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" onClick={() => navigate('/')}>
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
                    color: '#5e548e',
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
                        color: '#5e548e',
                        }}
                    >
                        Hi, { user.firstName }
                    </Typography>
                }

                <IconButton
                    onClick={() => {

                        if( user ) {
                            setIsAddOpen(true)
                        } else {
                            navigate('/login')
                        }

                    }}
                    sx={{
                    color: '#6a4c93',
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
                        color: '#6a4c93',
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
