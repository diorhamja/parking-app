import React, { useState } from 'react';
import DrawerContext from './DrawerContext';
import DrawerComponent from '../components/DrawerComponent';

const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);

    const openDrawer = (content) => {
        setDrawerContent(content);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setDrawerContent(null);
    };

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
        {children}
        <DrawerComponent isOpen={isDrawerOpen} onClose={closeDrawer}>
            {drawerContent}
        </DrawerComponent>
        </DrawerContext.Provider>
    );
};

export default DrawerProvider;
