import React from "react";
import axios from "axios";
import Card from "../Card/Card";

import "./welcome.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setRandomUser, setAllUser } from "../../features/userSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const randomUser = useSelector((state) => state.user.randomUser);
  const allUser = useSelector((state) => state.user.allUser);

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

  useEffect(() => {
    getRandomUser();
    getAllUser();
    console.log(allUser);
  }, [userToken]);


  return (
    <>
      <h1> Bienvenue sur l'intranet</h1>
      <p>
        la platforme de l'entreprise qui vous permet de retrouver tous vos
        collaborateurs{" "}
      </p>
      <p>Avez vous dis bonjour à:</p>
      calendar
      <br></br>
      {/* <FontAwesomeIcon icon="fa-solid fa-cake-candles" /> */}
      {randomUser && (
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
        />
      )}
      <button onClick={getRandomUser}>DIRE BONJOUR A QUELQU'UN D'AUTRE</button>
    </>
  );
};

export default Welcome;
