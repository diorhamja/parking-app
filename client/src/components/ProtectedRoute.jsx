import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user, car } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!car) {
        return <Navigate to="/register/car" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
