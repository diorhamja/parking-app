import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';
import { useSpots } from '../context/SpotContext';
import { useDrawer } from '../context/DrawerContext';
import Accepted from './Accepted';
import axios from 'axios';
import UserInfo from './UserInfo';
import { getDrivingETA } from '../utils/getDrivingETA';

const Posted = () => {

    const navigate = useNavigate();

    const { user, car } = useAuth();
    const { setSpots, selectedSpot, fetchAddress, refresh, setRefresh, setEta } = useSpots();
    const { openDrawer } = useDrawer();

    const [requests, setRequests] = useState([]);
    const [address, setAddress] = useState('');
    const [etas, setEtas] = useState({});

    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

    useEffect(() => {
        if (!selectedSpot) return;
    
        const loadData = async () => {
        const [lat, lng] = selectedSpot.location.coordinates;
        const addr = await fetchAddress(lat, lng);
        setAddress(addr);
    
        if (user && selectedSpot.user._id === user._id) {
            try {
            const res = await axios.get('http://localhost:8000/api/requests/spot/' + selectedSpot._id);
            setRequests(res.data);
            setRefresh(false);
    
            const etaResults = {};
    
            for (const req of res.data) {
                const origin = {
                lat: req.fromUser.location.coordinates[0],
                lng: req.fromUser.location.coordinates[1],
                };
                const destination = {
                lat,
                lng,
                };
    
                try {
                const etaData = await getDrivingETA({ origin, destination });
                if (etaData?.duration) {
                    etaResults[req._id] = etaData.duration;
                }
                } catch (err) {
                console.warn('Failed to get ETA for request:', req._id, err.message);
                }
            }
    
            setEtas(etaResults);
            } catch (err) {
            console.error('Error loading requests:', err.response?.data || err.message);
            }
        }
        };
    
        loadData();
    }, [selectedSpot, refresh]);


    if (!selectedSpot) return null;

    const handleUserClick = (user, eta) => {
        setSelectedUser(user);
        setIsUserInfoOpen(true);
        setEta(eta)
    };

    const handleAccept = async (reqId) => {

        try {
            await axios.patch(`http://localhost:8000/api/requests/accept/${reqId}`);
        
            const updated = await axios.get(`http://localhost:8000/api/requests/spot/${selectedSpot._id}`);
            setRequests(updated.data);
            console.log(updated.data);
        
            setSpots(prev => prev.map(spot =>
                spot._id === selectedSpot._id ? { ...spot, active: false } : spot
            ));

        openDrawer(<Accepted id={reqId} />);
        navigate(`/accepted/${reqId}`);
    
        } catch (err) {
        console.error('Error accepting request:', err.response?.data || err.message);
        }
    }

    return (
        <>
            <UserInfo user={ selectedUser} open={ isUserInfoOpen } onClose={() => setIsUserInfoOpen(false)} />

            <Box 
                sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 3,
                pt: 0
                }}
            >
                <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    mb: 2,
                }}
                >
                    <AccountCircleOutlinedIcon 
                    sx={{ 
                        width: 45, 
                        height: 45, 
                        mr: 3, 
                        color: '#FFB7C5'
                        }} 
                    />
                    <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                        {selectedSpot.user.firstName} {selectedSpot.user.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7D8BA5' }}>
                        Just posted
                    </Typography>
                    </Box>
                </Box>

                <Box
                component="img"
                src={car?.image}
                alt="Car"
                sx={{
                    width: '65%',
                    maxHeight: 180,
                    borderRadius: '12px',
                    objectFit: 'cover',
                    mb: 5,
                    display: 'block',
                    margin: '0 auto',
                }}
                />

                <Box 
                sx={{
                    mt: 2,
                    p: 1,
                    pb: 0,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(4px)'
                }}
                >
                <Box display="flex" alignItems="center" width="100%" mb={2}>
                    <FmdGoodOutlinedIcon sx={{ 
                    width: 30, 
                    height: 30, 
                    mr: 3, 
                    color: '#B5C7F5'
                    }} />
                    <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                        Address
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#7D8BA5', mt: 0, mb: 0 }}>
                        {address || 'Loading address...'}
                    </Typography>
                    </Box>
                </Box>
                </Box>

                <Box 
                sx={{
                    p: 1,
                    pb: 0,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(4px)'
                }}
                >
                <Box display="flex" alignItems="center" width="100%" mb={2}>
                    <DescriptionOutlinedIcon sx={{ 
                    width: 30, 
                    height: 30, 
                    mr: 3,
                    color: '#D4B8F5' 
                    }} />
                    <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                        Description
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#7D8BA5', mt: 0, mb: 0 }}>
                        {selectedSpot.description}
                    </Typography>
                    </Box>
                </Box>
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D', display: 'flex', alignItems: 'center' }}>
                    Status:&nbsp;
                    <Chip 
                    label="Active" 
                    size="small" 
                    sx={{
                        color: 'green',
                        bgcolor: '#A5D8D1',
                        fontWeight: 500
                    }}
                    />
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 600, color: '#5E6B8D', mb: 2 }}>
                Requests
                </Typography>
                
                <TableContainer 
                component={Paper} 
                sx={{ 
                    maxHeight: 300,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
                >
                <Table size="small" stickyHeader onClick={() => setRefresh(true)}>
                    <TableHead>
                    <TableRow >
                        <TableCell sx={{ fontWeight: 600, color: '#5E6B8D' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#5E6B8D' }}>ETA</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#5E6B8D' }}>Request</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {requests.map((req) => (
                        <TableRow key={req._id}>
                        <TableCell 
                            onClick={() => handleUserClick(req.fromUser, etas[req._id])}
                            sx={{ color: '#5E6B8D', cursor: 'pointer' }}
                        >
                            {req.fromUser?.firstName} {req.fromUser?.lastName}
                        </TableCell>
                        <TableCell sx={{ color: '#7D8BA5' }}>
                            {etas[req._id] ? etas[req._id] : 'Loading...'}
                        </TableCell> 
                        <TableCell>
                            <Button 
                            variant="contained" 
                            size="small"
                            sx={{
                                bgcolor: '#B5E8E0',
                                color: '#5E6B8D',
                                fontWeight: 500,
                                textTransform: 'none',
                                '&:hover': {
                                bgcolor: '#A5D8D1'
                                }
                            }}
                            onClick={() => handleAccept(req._id)}
                            >
                            Accept
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    {requests.length === 0 && (
                        <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ color: '#7D8BA5' }}>
                            No requests yet.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default Posted;