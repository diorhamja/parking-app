import React, { useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from 'axios';
import { Box, Chip } from '@mui/material';
import { useSpots } from '../context/SpotContext';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserInfo = ({ user, open, onClose }) => {

    const { fetchAddress, eta } = useSpots();
    const [userData, setUserData] = useState(null);
    const [address, setAddress] = useState(null);
    const [userCar, setUserCar] = useState(null);

    useEffect(() => {
        if (!user) return;

        axios.get(`http://localhost:8000/api/users/${user._id}`)
            .then(res => setUserData(res.data))
            .catch(console.error);

        axios.get(`http://localhost:8000/api/cars/user/${user._id}`)
            .then((res) => {
                setUserCar(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
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
        // <Dialog
        //     open={open}
        //     TransitionComponent={Transition}
        //     keepMounted
        //     onClose={onClose}
        //     aria-describedby="user-info-dialog"
        //     maxWidth="sm"
        //     fullWidth
        //     sx={{
        //         borderRadius: 2,
        //         p: 1
        //     }}  
        //     >
        //     <DialogContent>
        //         {userData ? (
        //         <>
        //         <DialogTitle sx={{ pb: 1 }}>
        //             <Box display="flex" alignItems="center" width="100%" mb={0}>
        //                 <AccountCircleOutlinedIcon sx={{ width: 45, height: 45, mr: 3, color: '' }} />
        //                 <Box sx={{ textAlign: 'left' }}>
        //                 <Typography variant="h5" sx={{ fontWeight: 600, color: '' }}>
        //                     {userData.firstName} {userData.lastName}
        //                 </Typography>
        //                 <Chip
        //                     label="Active"
        //                     size="small"
        //                     sx={{
        //                         // color: 'success.dark',
        //                         // bgcolor: 'success.light',
        //                     }}
        //                     icon={
        //                         <Box
        //                         sx={{
        //                             width: 10,
        //                             height: 10,
        //                             borderRadius: '50%',
        //                             bgcolor: 'success.main',
        //                         }}
        //                         />
        //                     }
        //                     />
        //                 </Box>
        //             </Box>
        //         </DialogTitle>

        //         <Box
        //             sx={{
        //                 display: 'flex',
        //                 justifyContent: 'center',
        //                 mb: 3,
        //                 mt: 0
        //             }}
        //             >
        //             <Box
        //                 component="img"
        //                 src={userCar?.image}
        //                 sx={{
        //                 width: '80%',
        //                 maxHeight: 200,
        //                 objectFit: 'contain',
        //                 borderRadius: 1
        //                 }}
        //             />
        //         </Box>

        //         <Box sx={{ px: 3, pb: 2 }}>
        //         <Box display="flex" alignItems="center" width="100%" mb={3}>
        //             <FmdGoodOutlinedIcon sx={{ width: 30, height: 30, mr: 3, color: '' }} />
        //             <Box sx={{ textAlign: 'left' }}>
        //             <Typography variant="body1" sx={{ fontWeight: 'bold', color: '' }}>
        //                 Address
        //             </Typography>
        //             <Typography variant="body2" color={!address ? '' : ''}>
        //                 {address || 'Loading address...'}
        //             </Typography>
        //             </Box>
        //         </Box>
                    
        //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        //             <Chip
        //                 label={`${eta} away`}
        //                 size="small"
        //                 color="info"
        //                 variant="outlined"
        //             />
        //             </Box>
        //         </Box>

        //         </>
        //         ) : (
        //         <DialogContentText>Loading...</DialogContentText>
        //         )}
        //     </DialogContent>
        // </Dialog>

        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="user-info-dialog"
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                borderRadius: 3,
                bgcolor: '#F8F5F2',
                p: 1
                }
            }}
            >
            <DialogContent>
                {userData ? (
                <>
                    <Box 
                    sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                    }}
                    >
                    <Box display="flex" alignItems="center">
                        <AccountCircleOutlinedIcon 
                        sx={{ 
                            width: 40, 
                            height: 40, 
                            mr: 2, 
                            color: '#FFB7C5' 
                        }} 
                        />
                        <Box>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                            {userData.firstName} {userData.lastName}
                        </Typography>
                        <Chip
                            label="Active"
                            size="small"
                            sx={{
                            mt: 0.5,
                            color: 'white',
                            bgcolor: '#A5D8D1',
                            fontWeight: 500
                            }}
                            icon={
                            <Box
                                sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: 'green',
                                ml: 0.5
                                }}
                            />
                            }
                        />
                        </Box>
                    </Box>
                    </Box>

                    <Box
                        component="img"
                        src={userCar?.image}
                        sx={{
                            width: '60%',
                            maxHeight: 200,
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
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(4px)'
                    }}
                    >
                    <Box display="flex" alignItems="flex-start">
                        <FmdGoodOutlinedIcon 
                        sx={{ 
                            width: 30, 
                            height: 30, 
                            mr: 2,
                            mt: 0.5,
                            color: '#B5C7F5' 
                        }} 
                        />
                        <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5E6B8D' }}>
                            Address
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#7D8BA5', mt: 0.5 }}>
                            {address || 'Loading address...'}
                        </Typography>
                        </Box>
                    </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Chip
                        label={`${eta} away`}
                        size="small"
                        sx={{
                        color: '#5E6B8D',
                        bgcolor: 'rgba(181, 199, 245, 0.3)',
                        borderColor: '#B5C7F5',
                        fontWeight: 500
                        }}
                        variant="outlined"
                    />
                    </Box>
                </>
                ) : (
                <DialogContentText sx={{ color: '#7D8BA5' }}>
                    Loading...
                </DialogContentText>
                )}
            </DialogContent>
            </Dialog>
    );
};

export default UserInfo;
