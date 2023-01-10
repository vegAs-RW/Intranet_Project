import { useEffect } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "./features/userSlice";

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = () => {
      let token = localStorage.getItem("token");
      dispatch(setUserToken(token))
    };
    getToken();
  }, []);

  return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Home />
        </div>
      </BrowserRouter>
  );
}

export default App;
