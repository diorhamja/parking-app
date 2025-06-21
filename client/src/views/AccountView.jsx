import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountView = (props) => {

    const { user, setUser } = props;
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default AccountView;