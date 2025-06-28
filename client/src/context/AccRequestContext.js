import { createContext, useContext } from 'react';

const AccRequestContext = createContext(null);

export const useAccRequest = () => {
    return useContext(AccRequestContext);
};

export default AccRequestContext;