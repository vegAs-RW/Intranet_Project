import React from "react";
// Import hook de react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import Axios pour requete API
import axios from "axios";
// Import hook de react-redux
import { useDispatch, useSelector } from "react-redux";
// Import reducer
import { setAllUser } from "../../features/userSlice";
// Import style
import "./editProfile.css";


const AdminEditProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Récupération des stores 
  const user = useSelector((state) => state.user.user);
  const userToken = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userToModify);
  // Création de state local avec le hook useState pour stocker les value du formulaire
  const [civility, setCivility] = useState("");
  const [category, setCategory] = useState("");
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState("");
  const [adminPrivilege, setAdminPrivilege] = useState(false);


  // Redirection si pas de token
  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, [userToken]);

  // Fonction avec appel API pour modifier un user à la soumission du formulaire
  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:9000/api/collaborateurs/${userId}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        gender: civility,
        firstname: name,
        lastname,
        email,
        password,
        phone,
        birthdate,
        city,
        country,
        photo,
        service: category,
        isAdmin: adminPrivilege
      },
    })
      .then(() => {
        // Une fois requete valider on refresh le store AllUser
        axios({
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
      })
      // On vide les champs du formulaire en remetant le state local sur valeur initiale
      .then(() => {
        setCivility("");
        setCategory("");
        setLastname("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBirthdate("");
        setPhone("");
        setCity("");
        setCountry("");
        setPhoto("");
        document.querySelector(".validation").innerHTML =
          "Les information ont été modifiés avec succés !";
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      {user && user.isAdmin &&(
        <>
          <h1>Modifier le profil (admin)</h1>

          <div className="line"></div>
          <div className="form-container">
          <form action="" onSubmit={handleSubmitAdmin}>
            <p className="validation"></p>
            <div className="input-container">
              <label htmlFor="civility">* Civilité :</label>
              <select
                required
                name="civility"
                id="civility"
                onChange={(e) => setCivility(e.target.value)}
              >
                <option value="default">- Choisir -</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="category">* Catégorie :</label>
              <select
                required
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="default">- Choisir -</option>
                <option value="Client">Client</option>
                <option value="Marketing">Marketing</option>
                <option value="Technique">Technique</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="lastname">* Nom :</label>
              <input
              required
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="name">* Prénom :</label>
              <input
              required
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">* Email :</label>
              <input
              required
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password-confirm">Confirmation :</label>
              <input
                type="password"
                id="password-confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="phone">Téléphone :</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="birthdate">* Date de naissance :</label>
              <input
              required
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                placeholder='<i className="fa-regular fa-calendar"></i>'
              />
            </div>
            <div className="input-container">
              <label htmlFor="city">* Ville :</label>
              <input
              required
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="country">* Pays :</label>
              <input
              required
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="photo">URL de la photo :</label>
              <input
                type="text"
                id="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="adminPrivilege">* Administrateur ? :</label>
              <input type="checkbox" name="adminPrivilege"  id="adminPrivilege" onChange={(e) => {
                if (adminPrivilege === false) {
                  setAdminPrivilege(true)
                }
                if (adminPrivilege === true) {
                  setAdminPrivilege(false)
                }
              }}></input>
            </div>
            <input type="submit" className="form-btn" value="Modifier" />
          </form>
          </div>
        </>
      )}
    </>
  );
};

export default AdminEditProfile;
