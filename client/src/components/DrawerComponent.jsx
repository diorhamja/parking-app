import React from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerTheme = createTheme({
    palette: {
        background: {
        drawer: '#F8F5F2',
        paper: '#FFFFFF'
        },
        text: {
        primary: '#2D3748',
        secondary: '#4A5568'
        },
        primary: {
        main: '#2C5282',
        dark: '#1E4B8C'
        },
        success: {
        main: '#38A169'
        },
        warning: {
        main: '#DD6B20'
        },
        error: {
        main: '#E53E3E'
        },
        info: {
        main: '#3182CE'
        }
    },
    components: {
        MuiDrawer: {
        styleOverrides: {
            paper: {
            background: '#F8F5F2',
            borderRight: 'none'
            }
        }
        }
    }
});

const DrawerComponent = ({ isOpen, onClose, children }) => {
    return (
        <ThemeProvider theme={drawerTheme}>
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
            variant="persistent"
            sx={{
            '& .MuiDrawer-paper': {
                width: { xs: '100%', sm: '30vw' },
                boxSizing: 'border-box',
                p: 3,
            },
            }}
        >
            <Box sx={{ position: 'relative' }}>
            <IconButton
                onClick={onClose}
                sx={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                color: 'text.primary',
                '&:hover': {
                    color: 'primary.main'
                }
                }}
            >
                <CloseIcon />
            </IconButton>

            <Box mt={5}>
                {children}
            </Box>
            </Box>
        </Drawer>
        </ThemeProvider>
    );
};

export default DrawerComponent;