import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = (props) => {

    const { user, children } = props;

    if (user) {
        return <Navigate to={'/'} replace />;
    }
    
    return children;
}

export default PublicRoute;