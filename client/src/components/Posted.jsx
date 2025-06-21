import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, IconButton, AppBar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Posted = (props) => {

    const { isPostedOpen, setIsPostedOpen, selectedSpot, user } = props;
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!selectedSpot?._id) return;

        axios.get('http://localhost:8000/api/requests/spot/' + selectedSpot._id)
            .then(res => {
                setRequests(res.data)
            })
            .catch(err => {
                console.error('Error creating request', err.response?.data || err.message);
            }, [selectedSpot])
    })

    return (
            <Drawer
                anchor="right"
                open={isPostedOpen}
                variant="persistent"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer - 1,
                    '& .MuiDrawer-paper': {
                    width: '30vw',
                    boxSizing: 'border-box',
                    padding: 2,
                    },
                }}
                >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Post Details</Typography>
                    <IconButton onClick={() => setIsPostedOpen(false)}>
                    <CloseIcon />
                    </IconButton>
                </Box>
            
                <Box mt={2}>
                    <Typography variant="body1">

                    {selectedSpot &&
                        selectedSpot.user.email
                    }

                    </Typography>

                    {requests.map(request => (
                    <Typography key={request._id}>{request.fromUser?.email}</Typography>
                    ))}
                </Box>
            </Drawer>
    );
}

export default Posted;