import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import "./Home.css";

const Home = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: `http://localhost:9000/api/login`,
            data: {
                email,
                password
            }
        })
        .then((res) => {
            const {success} = res.data
            console.log(success);
            try {
                localStorage.setItem('token', res.data.token)
            }  catch {
                console.log('raté')
            }
            window.location ='/'; /* Mettre la localisation de la route pour affichage de la page random*/
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className='login-container'>
            <div className='login-header'>
                <h1>Connexion</h1>
                <div className='line'></div>
                <p>Pour vous connecter à l'intranet, entrez votre identifiant et mot de passe</p>
            </div>
           <form action="" onSubmit={handleLogin}>
            <div className='input-container'>
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='input-container'>
                <label htmlFor='password'>Mot de passe</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" className='form-btn' value="Connexion"/>
            </form>
        </div>
    );
};

export default Home;