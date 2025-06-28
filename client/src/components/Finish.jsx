import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    Divider,
    Chip,
    useTheme
  } from '@mui/material';
  import {
    CheckCircle as CheckCircleIcon,
    CalendarToday as CalendarIcon,
    Timer as TimerIcon,
    Star as StarIcon,
    LocationOn as LocationIcon
  } from '@mui/icons-material';
import React, { useEffect, useState, forwardRef } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useSpots } from '../context/SpotContext';
import { useDrawer } from '../context/DrawerContext';
import { useAccRequest } from '../context/AccRequestContext';


const Finish = ({ open, onClose }) => {

    const { finish } = useAccRequest();
    const { setClickedLocation } = useSpots();
    const { closeDrawer } = useDrawer();

    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                borderRadius: 4,
                overflow: 'visible',
                backgroundColor: '#F8F5F2'
                }
            }}
            >
                <Box
                    sx={{
                    position: 'absolute',
                    top: -60,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    bgcolor: theme.palette.success.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 3,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                        '0%': { boxShadow: `0 0 0 0 ${theme.palette.success.light}` },
                        '70%': { boxShadow: `0 0 0 15px rgba(0,0,0,0)` },
                        '100%': { boxShadow: `0 0 0 0 rgba(0,0,0,0)` }
                    }
                    }}
                >
                    <CheckCircleIcon
                    sx={{
                        fontSize: 80,
                        color: theme.palette.success.main,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                    />
                </Box>

                <DialogContent sx={{ pt: 8, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Done
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Thank you for using our parking service!
                    </Typography>
                </DialogContent>

                <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        bgcolor: 'success.main',
                        '&:hover': { bgcolor: 'success.dark' }
                    }}
                    onClick={() => {
                        setClickedLocation(null);
                        closeDrawer();
                        finish();
                    }}
                    >
                    Go Home
                    </Button>
                </Box>
        </Dialog>
    );
};

export default Finish;
