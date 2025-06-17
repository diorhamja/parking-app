import React from 'react';
import { Drawer, Box, Typography, IconButton, AppBar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Posted = (props) => {

    const { isPostedOpen, setIsPostedOpen } = props;

    return (
        <AppBar position='fixed'>
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
                    <IconButton>
                    <CloseIcon />
                    </IconButton>
                </Box>
            
                <Box mt={2}>
                    <Typography variant="body1">
                    You can place any content here, like a form, preview, or confirmation.
                    </Typography>
                </Box>
            </Drawer>
        </AppBar>
    );
}

export default Posted;