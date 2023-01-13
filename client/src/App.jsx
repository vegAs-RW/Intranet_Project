// Import Router de React
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import des composants de l'app
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import WorkerList from "./views/WorkerList/WorkerList";
import EditProfile from "./views/Profile/EditProfile";
import AddProfile from "./views/Profile/AddProfile";
import AdminEditProfile from "./views/Profile/AdminEditProfile";

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
          <Route path="/add-profile" element={<AddProfile />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
