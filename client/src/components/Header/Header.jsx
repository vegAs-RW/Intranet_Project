// Import des hook
import { useDispatch, useSelector } from "react-redux";
// Import reducer
import { resetUser } from "../../features/userSlice";
// Import Router
import { Link } from "react-router-dom";
// Import style
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  // Récupération des stores
  const userToken = useSelector((state) => state.user.token);
  const connectedUserData = useSelector((state) => state.user.user);

  // Fonction pour se deconnecté
  const logout = () => {
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
        <div className="header-right-container">
          <Link to="/worker">
            <button className="header-btn">
              <i className="fa-solid fa-list"></i>
              Liste
            </button>
          </Link>

          {connectedUserData.isAdmin && (
            <Link to="/addworker">
              <button className="header-btn">
                <i className="fa-solid fa-list"></i>
                Ajouter
              </button>
            </Link>
          )}

          <Link to="/edit">
            <div className="header-img">
              {connectedUserData && connectedUserData.photo ? (
                <img src={connectedUserData.photo} alt="photo de profil" />
              ) : (
                <img
                  src="/istockphoto-1008665336-170667a.jpeg"
                  alt="avatar vierge"
                />
              )}
            </div>
          </Link>
          <button className="header-btn" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            Déconnexion
          </button>
        </div>
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
