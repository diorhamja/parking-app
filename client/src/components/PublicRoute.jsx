import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = (props) => {

    const { children } = props;
    const { user, car } = useAuth();

    if (user && car) {
        return <Navigate to={'/'} replace />;
    }
    
    return children;
}

export default PublicRoute;