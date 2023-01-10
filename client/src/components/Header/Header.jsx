import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../features/userSlice";

import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const connectedUserData = useSelector((state) => state.user.user);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(resetUser);
    location.reload();
  };

  return (
    <div className="header">
      <div className="header-logo">Intranet</div>

      {userToken ? (
        <>
          <button className="header-btn">Liste</button>
          <div className="header-img">
            <img src={connectedUserData.photo} alt="" />
          </div>
          <button className="header-btn" onClick={logout}>
            Déconnexion
          </button>
        </>
      ) : (
        <button className="header-btn">Connexion</button>
      )}
    </div>
  );
};

export default Header;
