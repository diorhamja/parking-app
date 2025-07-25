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
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import Header from '../components/Header';
import EditProfile from '../components/EditProfile';
import EditCar from '../components/EditCar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountView = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <>
        <Header />
        <Box sx={{ 
        display: 'flex', 
        height: '80vh',
        width: '70vw',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '0 0 20px 20px',
        }}>

        <Paper 
            elevation={0} 
            sx={{ 
            width: 200, 
            bgcolor: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(4px)',
            borderRight: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '0 0 0 20px'
            }}
        >
            <Box>
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Avatar 
                sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 2,
                    bgcolor: '#FFB7C5',
                    margin: '0 auto'
                }}
                >
                <AccountCircleIcon sx={{ fontSize: 50 }} />
                </Avatar>
                <Typography variant="subtitle1" fontWeight={600} color="#5E6B8D" mt={1}>
                {user.firstName} {user.lastName}
                </Typography>
            </Box>

            <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                '& .MuiTabs-indicator': {
                    left: 0,
                    backgroundColor: '#D4B8F5'
                }
                }}
            >
                <Tab 
                label="Account" 
                icon={<AccountCircleIcon />} 
                iconPosition="start" 
                sx={{
                    justifyContent: 'flex-start',
                    minHeight: 48,
                    color: activeTab === 0 ? '#5E6B8D' : '#7D8BA5',
                    '&.Mui-selected': {
                    color: '#5E6B8D',
                    fontWeight: 500
                    }
                }} 
                />
                <Tab 
                label="My Car" 
                icon={<DirectionsCarIcon />} 
                iconPosition="start"
                sx={{
                    justifyContent: 'flex-start',
                    minHeight: 48,
                    color: activeTab === 1 ? '#5E6B8D' : '#7D8BA5',
                    '&.Mui-selected': {
                    color: '#5E6B8D',
                    fontWeight: 500
                    }
                }} 
                />
                <Tab 
                label="History" 
                icon={<HistoryIcon />} 
                iconPosition="start"
                sx={{
                    justifyContent: 'flex-start',
                    minHeight: 48,
                    color: activeTab === 2 ? '#5E6B8D' : '#7D8BA5',
                    '&.Mui-selected': {
                    color: '#5E6B8D',
                    fontWeight: 500
                    }
                }} 
                />
                <Tab 
                label="Settings" 
                icon={<SettingsIcon />} 
                iconPosition="start"
                sx={{
                    justifyContent: 'flex-start',
                    minHeight: 48,
                    color: activeTab === 3 ? '#5E6B8D' : '#7D8BA5',
                    '&.Mui-selected': {
                    color: '#5E6B8D',
                    fontWeight: 500
                    }
                }} 
                />
            </Tabs>
            </Box>

            <Button
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
                mb: 2,
                mx: 2,
                color: 'white',
                justifyContent: 'center',
                textTransform: 'none',
                borderRadius: '20px',
                backgroundColor: '#7D8BA5',
                fontWeight: 'bold'
            }}
            >
            Go Home
            </Button>
        </Paper>

        <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
            {activeTab === 0 && (
                <EditProfile />
            )}

            {activeTab === 1 && (
                <EditCar />
            )}

            {activeTab === 2 && (
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
                Parking History
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography color="#7D8BA5">
                Your parking history will appear here
                </Typography>
            </Paper>
            )}

            {activeTab === 3 && (
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
                Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography color="#7D8BA5">
                Additional settings will appear here
                </Typography>
            </Paper>
            )}
        </Box>
        </Box>
        </>
    );
};

export default AccountView;