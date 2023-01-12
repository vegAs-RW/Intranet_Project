import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./card.css";
import { setAllUser, setUserToModifyId } from "../../features/userSlice";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AdminEditProfile from "../EditProfile/AdminEditProfile";

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
  userId
}) => {

  // Récupération du store user
  const connectedUserData = useSelector((state) => state.user.user);
  const userData = useSelector((state) => state.user.allUser)
  // Appel du store contenant le token de l'utilisateur connecté
  const userToken = useSelector((state) => state.user.token);
  const randomUserData = useSelector((state) => state.user.randomUser)
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
        axios({
          method: "get",
          url: `http://localhost:9000/api/collaborateurs`,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((res) => {
            console.log(res);
            dispatch(setAllUser(res.data));
          })
      })
      .catch((err) => console.log(err))
  }

  // Modifier la couleur du service
  const getServicesColor = () => {
    if (service == "Marketing") { return { backgroundColor: "palevioletred" } }
    if (service == "Client") { return { backgroundColor: "green" } }
    if (service == "Technique") { return { backgroundColor: "blue" } }
  }

  const handleModify = () => {
    dispatch(setUserToModifyId(userId))
  }



  return (
    <div className="card">
      {photo ?
        <img style={{ height: "100%" }} src={photo}></img>
        : <img src="/Avatar.jpeg" alt="avatar vierge" />



      }


      <div className="card_right">
        <div style={{ fontWeight: "700" }} >
          {firstname + " " + lastname + " "}
          <span style={{ fontStyle: "italic" }}>{getAge()}</span>{" "}
        </div>

        <div style={{ fontWeight: "300" }}>
          {city + ", " + country} { }
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

        <div className="card_service"
          style={getServicesColor()}

        >{service.toUpperCase()}</div>
        {isEditBtn && (
          <>
            <div>

              <NavLink to='/admin-edit'>
                <button className="card-btn" onClick={handleModify}>Modifier</button>
              </NavLink>

              <button className="card-btn" onClick={deleteUser}>Supprimer</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
