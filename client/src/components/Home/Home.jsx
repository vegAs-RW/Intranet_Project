import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import "./Home.css";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setUser, setUserToken } from '../../features/userSlice';
import SignInForm from '../SignInForm/SignInForm';


const Home = () => {
    const isLogged = useSelector(state => state.user.token)
    return (
        <>
        {isLogged ? (
            <h2>Connecté</h2>
        ) : (
            <SignInForm/>
        )}
        
        </>
    );
};

export default Home;