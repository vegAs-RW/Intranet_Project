import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import "./Home.css";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setUser, setUserToken, setRandomUser } from '../../features/userSlice';
import SignInForm from '../SignInForm/SignInForm';
import Welcome from '../Welcome/Welcome'




const Home = () => {
    const isLogged = useSelector(state => state.user.token)
    
    return (
        <>
        {isLogged ? (
            <Welcome/>
        ) : (
            <SignInForm/>
        )}
        
        </>
    );
};

export default Home;