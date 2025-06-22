import { createContext, useContext } from 'react';

const DrawerContext = createContext();

export const useDrawer = () => {
    return useContext(DrawerContext);
};

export default DrawerContext;
