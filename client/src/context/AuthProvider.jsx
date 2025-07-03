import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLocation, setUserLocation] = useState([ 41.3275, 19.8187 ]);
    const [car, setCar] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/me', { withCredentials: true })
            .then((res) => {
                console.log(`In here ${res.data}`)
                setUser(res.data.user);
            })
            .catch(() => {
                setUser(null);
            })
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation not supported.");
            return;
        }
    
        const success = (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation((prev) => {
                if (prev[0] !== latitude || prev[1] !== longitude) {

                    if (user) {
                        axios.patch(`http://localhost:8000/api/users/${user._id}`, {
                            location: {
                                type: 'Point',
                                coordinates: [latitude, longitude]
                            }
                        }, { withCredentials: true })
                        .then(res => {
                            console.log('User location updated on server:', res.data);
                        })
                        .catch(err => {
                            console.error('Error updating user location:', err.response?.data || err.message);
                        });
                    }

                    return [latitude, longitude];
                }
                return prev;
            });
        };
    
        const error = (err) => {
            console.warn("Geolocation denied or failed. Using default location.");
        };
    
        const watchId = navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        });
    
        return () => navigator.geolocation.clearWatch(watchId);
    }, [user]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/api/cars/user/${user._id}`)
            .then((res) => {
                console.log(res.data);
                setCar(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [user]);

    const logout = async () => {
        try {
            await axios.get('http://localhost:8000/api/users/logout', { withCredentials: true });
        } catch (err) {
            console.error('Logout error:', err.response?.data || err.message);
        }
        setUser(null);
        setCar(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated: !!user, userLocation, car, setCar }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
