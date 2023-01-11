import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../features/userSlice";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const connectedUserData = useSelector((state) => state.user.user);

  const logout = () => {
    //localStorage.removeItem("token");
    dispatch(resetUser);
    location.reload();
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo_intra">
          <i className="fa-solid fa-network-wired"></i>
          Intranet
        </div>
      </Link>

      {userToken ? (
        <>
          <Link to="/worker">
            <button className="header-btn">
              <i className="fa-solid fa-list"></i>
              Liste
            </button>
          </Link>

          <Link to="/edit">
            <div className="header-img">
              {connectedUserData && (
                <img src={connectedUserData.photo} alt="" />
              )}
            </div>
          </Link>
          <button className="header-btn" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            Déconnexion
          </button>
        </>
      ) : (
        <button className="header-btn">
          <i className="fa-solid fa-right-to-bracket"></i>
          Connexion
        </button>
      )}
    </div>
  );
};

export default Header;
