// Import hook
import { useDispatch, useSelector } from "react-redux";
// Import axios pour requete API
import axios from "axios";
// Import style
import "./card.css";
// Import des reducers
import { setAllUser, setUserToModifyId } from "../../features/userSlice";
// Import router pour redirection
import { NavLink } from "react-router-dom";

const Card = ({
  lastname,
  firstname,
  birthdate,
  city,
  country,
  photo,
  email,
  phone,
  service,
  isEditBtn,
  userId,
}) => {
  // Appel du store contenant le token de l'utilisateur connecté
  const userToken = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  // Fonction pour afficher l'age
  const getAge = () => {
    let now = new Date().getTime();
    let birthday = new Date(birthdate).getTime();
    return (
      "(" +
      Math.ceil((now - birthday) / (1000 * 60 * 60 * 24 * 365.25)) +
      " ans)"
    );
  };

  // Fonction pour que l'admin puisse supprimer un user
  const deleteUser = () => {
    axios({
      method: "delete",
      url: `http://localhost:9000/api/collaborateurs/${userId}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        // Une fois le user supprimé, on refresh le store contenant les users
        axios({
          method: "get",
          url: `http://localhost:9000/api/collaborateurs`,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }).then((res) => {
          dispatch(setAllUser(res.data));
        });
      })
      .catch((err) => console.log(err));
  };

  // Modifier la couleur du service
  const getServicesColor = () => {
    if (service == "Marketing") {
      return { backgroundColor: "palevioletred" };
    }
    if (service == "Client") {
      return { backgroundColor: "green" };
    }
    if (service == "Technique") {
      return { backgroundColor: "blue" };
    }
  };

  // fonction pour ajouter l'id du user selectionné dans le store dédié
  const handleModify = () => {
    dispatch(setUserToModifyId(userId));
  };

  return (
    <div className="card">
      <img style={{ height: "100%" }} src={photo}></img>

      <div className="card_right">
        <div style={{ fontWeight: "700" }}>
          {firstname + " " + lastname + " "}
          <span style={{ fontStyle: "italic" }}>{getAge()}</span>{" "}
        </div>

        <div style={{ fontWeight: "300" }}>
          {city + ", " + country} {}
        </div>

        <div className="card_line">
          <i className="fa-solid fa-envelope"></i>
          {email}
        </div>

        <div className="card_line">
          <i className="fa-solid fa-phone-flip"></i>
          {phone}
        </div>

        <div className="card_line">
          <i className="fa-solid fa-cake-candles"></i>
          {birthdate}
        </div>

        <div className="card_service" style={getServicesColor()}>
          {service.toUpperCase()}
        </div>
        {isEditBtn && (
          <>
            <div>
              <NavLink to="/admin-edit">
                <button className="card-btn" onClick={handleModify}>
                  Modifier
                </button>
              </NavLink>

              <button className="card-btn" onClick={deleteUser}>
                Supprimer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
