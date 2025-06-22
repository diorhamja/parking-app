import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Header from './components/Header';
import CarRegister from './views/CarRegister';
import PublicRoute from './components/PublicRoute';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AccountView from './views/AccountView';
import AcceptedMap from './components/AcceptedMap';

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
        <Route path='/register/car' element={<PublicRoute><CarRegister/></PublicRoute>} />
        <Route path='/account' element={<AccountView/>} />
        <Route path='/accepted' element={<AcceptedMap/>} />
      </Routes>
  );
}

export default App;
