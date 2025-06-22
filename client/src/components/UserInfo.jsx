import React, { useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Box } from '@mui/material';
import { useSpots } from '../context/SpotContext';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserInfo = ({ user, open, onClose }) => {

    const { fetchAddress } = useSpots();
    const [userData, setUserData] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:8000/api/users/${user._id}`)
        .then(res => setUserData(res.data))
        .catch(console.error);
    }, [user]);

    useEffect(() => {
        if (userData) {
            const getAddress = async () => {
                const lat = userData.location.coordinates[0];
                const lng = userData.location.coordinates[1];

                const address = await fetchAddress(lat, lng);
                setAddress(address);
            };

            getAddress();
        }
    }, [userData]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="user-info-dialog"
            maxWidth="sm"
            fullWidth
            >
            <DialogContent>
                {userData ? (
                <>
                    <Typography variant="h6">{userData.firstName} {userData.lastName}</Typography>
                    <Typography>{userData.email}</Typography>
                    <Box
                        component="img"
                        src="../car.png"
                        alt="Car"
                        sx={{
                        width: '50%',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        mb: 2,
                        }}
                    />
                    <Typography>{ address }</Typography>
                    <Typography>10 minutes</Typography>
                </>
                ) : (
                <DialogContentText>Loading...</DialogContentText>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UserInfo;
