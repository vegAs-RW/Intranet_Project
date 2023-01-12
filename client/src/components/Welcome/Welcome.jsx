import React from "react";
// Import axios pour requete API
import axios from "axios";
// Import composant
import Card from "../Card/Card";
// Import style
import "./welcome.css";
// Import hook
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// Import reducer
import { setRandomUser, setAllUser } from "../../features/userSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  // Appel du store contenant le token de l'utilisateur connecté
  const userToken = useSelector((state) => state.user.token);
  // Appel du store contenant le user random
  const randomUser = useSelector((state) => state.user.randomUser);
  // Requete API pour stocker dans le store la data d'un utilisateur random
  const getRandomUser = async () => {
    await axios({
      method: "get",
      url: `http://localhost:9000/api/collaborateurs/random`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        dispatch(setRandomUser(res.data));
      })
      .catch((err) => console.log(err));
  };
  
  // Requete API pour stocker dans le store la data de tous les utilisateurs
  const getAllUser = async () => {
    await axios({
      method: "get",
      url: `http://localhost:9000/api/collaborateurs`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        dispatch(setAllUser(res.data));
      })
      .catch((err) => console.log(err));
  };

  // Appel des fonctions de requete API dans le hook
  useEffect(() => {
    getRandomUser();
    getAllUser();
  }, []);

  return (
    <div className="welcome">
      <h1> Bienvenue sur l'intranet</h1>
      <p>
        la platforme de l'entreprise qui vous permet de retrouver tous vos
        collaborateurs{" "}
      </p>
      <p>Avez vous dis bonjour à:</p>
      {/* <FontAwesomeIcon icon="fa-solid fa-cake-candles" /> */}
      {randomUser && (
        <div className="welcome_card_container">


          <Card
            lastname={randomUser.lastname}
            firstname={randomUser.firstname}
            birthdate={randomUser.birthdate}
            city={randomUser.city}
            country={randomUser.country}
            photo={randomUser.photo}
            email={randomUser.email}
            phone={randomUser.phone}
            service={randomUser.service}
            isEditBtn={false}

          />
        </div>

      )}
      <button onClick={getRandomUser}>DIRE BONJOUR A QUELQU'UN D'AUTRE</button>
    </div>
  );
};

export default Welcome;
