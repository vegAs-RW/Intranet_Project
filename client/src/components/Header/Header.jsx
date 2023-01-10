import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UidContext } from "../AppContext";

import "./Header.css";

const Header = () => {
  const uid = useContext(UidContext);

  const logout = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <div className="header">
      <div className="logo_intra">
        <i class="fa-solid fa-network-wired"></i>
        Intranet</div>

      {uid ? (
        <>
          <button className="header-btn">
            <i class="fa-solid fa-list"></i>
            Liste</button>
          <div>*image profil*</div>
          <button className="header-btn" onClick={logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            Déconnexion
          </button>
        </>
      ) : (
        <button className="header-btn">
          <i class="fa-solid fa-right-to-bracket"></i>
          Connexion</button>
      )}
    </div>
  );
};

export default Header;
