import React from "react";
// Import hook
import { useState } from "react";
import { useDispatch } from "react-redux";
// Import axios pour requete API
import axios from "axios";
// Import reducer
import { setUser, setUserToken } from "../../features/userSlice";
// Import style
import "./SignInForm.css";



const SignInForm = () => {
  // State local pour stocker la data des inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // Fonction pour se connecter
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:9000/api/login`,
      data: {
        email,
        password,
      },
    })
      // Si requete validé on dipatch la data du user dans le store et on dispatch le token dans un store
      .then((res) => {
        const { success } = res.data;
        console.log(success);
        try {
          localStorage.setItem("token", res.data.token);
          dispatch(setUserToken(res.data.token));
          dispatch(setUser(res.data.user));
        } catch {
          console.log("raté");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">

      <p className="login-header">Connexion</p>
      <div className="line"></div>
      <p>
        Pour vous connecter à l'intranet, entrez votre identifiant et mot de
        passe
      </p>

      <form action="" onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" className="form-btn" value="Connexion" />
      </form>
    </div>
  );
};

export default SignInForm;
