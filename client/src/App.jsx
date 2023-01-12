
import { useEffect } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "./features/userSlice";
import Welcome from './components/Welcome/Welcome';
import WorkerList from './components/WorkerList/WorkerList';
import EditProfile from './components/EditProfile/EditProfile';
import AddWorker from "./components/AddWorker/AddWorker";


function App() {
  //const isLogged = useSelector(state => state.user.token)


 

  return (

    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/worker" element={<WorkerList />} ></Route>
          <Route path="/edit" element={<EditProfile />} ></Route>
          <Route path='/addworker' element={<AddWorker />}></Route> 
        </Routes>
      </div>
    </BrowserRouter>


  );
}

export default App;
