// Import Router de React
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import des composants de l'app
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import WorkerList from "./components/WorkerList/WorkerList";
import EditProfile from "./components/EditProfile/EditProfile";
import AddWorker from "./components/AddWorker/AddWorker";
import AdminEditProfile from "./components/EditProfile/AdminEditProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/worker" element={<WorkerList />}></Route>
          <Route path="/edit" element={<EditProfile />}></Route>
          <Route path="/admin-edit" element={<AdminEditProfile />}></Route>
          <Route path="/addworker" element={<AddWorker />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
