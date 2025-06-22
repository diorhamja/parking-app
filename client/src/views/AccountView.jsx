import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccountView = (props) => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        logout(user);
        navigate('/');
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default AccountView;