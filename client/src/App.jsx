import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [userLocation, setUserLocation] = useState([ 41.3275, 19.8187 ]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        console.log("Initial location:", latitude, longitude);
      },
      () => {
        console.log("Failed to get location.");
      }
    );
  
    const watchId = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        console.log("Updated location:", latitude, longitude);
      },
      () => {
        console.log("Failed to watch location.");
      }
    );
  
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home userLocation={ userLocation } user={ user } />} />
        <Route path='/login' element={<Login setUser={ setUser } />} />
        <Route path='/register' element={<Register setUser={ setUser } />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
