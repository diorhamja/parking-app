import { createContext, useContext } from 'react';

const SpotContext = createContext(null);

export const useSpots = () => {
  return useContext(SpotContext);
};

export default SpotContext;