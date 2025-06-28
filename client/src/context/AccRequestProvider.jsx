import React, { useState, useEffect } from 'react';
import AccRequestContext from './AccRequestContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccRequestProvider = ({ children }) => {

    const navigate = useNavigate();

    const [otherUser, setOtherUser] = useState(null);
    const [otherCar, setOtherCar] = useState(null);

    useEffect(() => {
        if (otherUser) {
            axios.get(`http://localhost:8000/api/cars/user/${otherUser._id}`)
            .then((res) => {
                console.log(res.data);
                setOtherCar(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [otherUser]);

    const finish = () => {
        setOtherUser(null);
        setOtherCar(null);
        navigate('/');
    }

    return (
        <AccRequestContext.Provider 
        value={{
            otherUser,
            setOtherUser,
            otherCar,
            setOtherCar,
            finish
        }}>
            { children }
        </AccRequestContext.Provider>
    )
}

export default AccRequestProvider;