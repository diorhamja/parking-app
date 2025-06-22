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
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';
import { useSpots } from '../context/SpotContext';
import { useDrawer } from '../context/DrawerContext';
import axios from 'axios';
import UserInfo from './UserInfo';

const Posted = (props) => {

    const navigate = useNavigate();

    const { user } = useAuth();
    const { selectedSpot, fetchAddress } = useSpots();

    const [requests, setRequests] = useState([]);
    const [address, setAddress] = useState('');

    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

    useEffect(() => {
        if (!selectedSpot) return;

        const loadData = async () => {
            const [lat, lng] = selectedSpot.location.coordinates;
            const addr = await fetchAddress(lat, lng);
            setAddress(addr);
        }

        if (user && selectedSpot.user._id === user._id) {
            axios.get('http://localhost:8000/api/requests/spot/' + selectedSpot._id)
            .then(res => {
                setRequests(res.data)
            })
            .catch(err => {
                console.error('Error creating request', err.response?.data || err.message);
            })
        }

        loadData();
    }, [selectedSpot]);

    if (!selectedSpot) return null;

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsUserInfoOpen(true);
    };

    const handleAccept = (user) => {
        console.log(`Accepted from ${user.firstName}`);
        navigate('/accepted');
    }

    return (
        <>
        <UserInfo user={ selectedUser} open={ isUserInfoOpen } onClose={() => setIsUserInfoOpen(false)} />
        <Box sx={{ width: '100%' }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Posted Spot</Typography>
            </Box>
    
            {/* Spot Info */}
            <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">Posted by:</Typography>
                <Typography mb={1}>
                    {selectedSpot.user.firstName} {selectedSpot.user.lastName}
                </Typography>
        
                <Typography variant="subtitle1" fontWeight="bold">Location:</Typography>
                <Typography mb={1}>{address || 'Loading...'}</Typography>
        
                <Typography variant="subtitle1" fontWeight="bold">Description:</Typography>
                <Typography mb={1}>{selectedSpot.description}</Typography>
        
                <Typography variant="subtitle1" fontWeight="bold" display="flex" alignItems="center">
                    Status:&nbsp;<Chip label="Active" color="success" size="small" />
                </Typography>
            </Box>
    
            {/* Requests */}
            <Typography variant="h6" gutterBottom>Requests</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>ETA</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {requests.map((req) => (
                        <TableRow key={req._id}>
                        <TableCell onClick={() => handleUserClick(req.fromUser)} >{req.fromUser?.firstName} {req.fromUser?.lastName}</TableCell>
                        <TableCell>10 min</TableCell>
                        <TableCell>
                            <Button variant="contained" size="small" color="primary" onClick={() => handleAccept(req.fromUser)}>
                            Accept
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    {requests.length === 0 && (
                        <TableRow>
                        <TableCell colSpan={3} align="center">No requests yet.</TableCell>
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