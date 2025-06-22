import React from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DrawerComponent = ({ isOpen, onClose, children }) => {
    return (
        <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        variant="persistent"
        PaperProps={{
            sx: {
            width: '30vw',
            padding: 3,
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
            },
        }}
        >
        <Box sx={{ position: 'relative' }}>
            <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 0, right: 0 }}
            >
            <CloseIcon />
            </IconButton>

            <Box mt={5}>
            {children}
            </Box>
        </Box>
        </Drawer>
    );
};

export default DrawerComponent;
