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
      <div className="logo_intra">Intranet</div>

      {uid ? (
        <>
          <button className="header-btn">Liste</button>
          <div>*image profil*</div>
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
