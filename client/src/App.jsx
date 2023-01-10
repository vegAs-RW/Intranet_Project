import { useEffect } from 'react';
import { useState } from 'react'
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom';
import './App.css'
import { UidContext } from './components/AppContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {

  const [uid, setUid] = useState(null);

  useEffect(() => {
    const getToken = () => {
      let token = localStorage.getItem("token");
      setUid(token);
    }
    getToken();
    console.log(uid);
  },[uid])

  return (
    <UidContext.Provider value={uid}>
    <BrowserRouter>
    <div className="App">
      <Header/>
    <Home />
    </div>
    </BrowserRouter>
    </UidContext.Provider>
  )
}

export default App
