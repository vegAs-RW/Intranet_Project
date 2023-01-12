// Import hook
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import composant
import Card from "../Card/Card";
// Import style
import "./workerList.css";

const WorkerList = () => {
  // Récupération des stores
  const isLogged = useSelector((state) => state.user.token);
  const allUser = useSelector((state) => state.user.allUser);
  const connectedUserData = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  // Hook pour vérifié si le user est connecté sinon redirection
  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  // State locale pour filtre de recherche
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [selectedWorkService, setSelectedWorkService] = useState("default");

  const returnFiltredList = () => {
    if (!allUser) {
      return <> nous rencontrons un problème,merci de rafraichir la page </>;
    }

    let filtredUser = allUser;

    if (selectedWorkService != "default") {
      filtredUser = filtredUser.filter(
        (user) => user.service.toLowerCase() === selectedWorkService
      );
    }

    if (searchQuery !== "") {
      if (searchBy === "name") {
        filtredUser = filtredUser.filter(
          (user) =>
            user.firstname.toLowerCase().includes(searchQuery) ||
            user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (searchBy === "location") {
        filtredUser = filtredUser.filter(
          (user) =>
            user.city.toLowerCase().includes(searchQuery) ||
            user.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }


    if (!filtredUser[0]) {
      return <>Aucun résultat trouvé</>
    }

    return filtredUser.map((user, Key) =>
      <div key={Key} className="user_table_card" >

        <Card key={user.id}
          userId={user.id}
          lastname={user.lastname}
          firstname={user.firstname}
          birthdate={user.birthdate}
          city={user.city}
          country={user.country}
          photo={user.photo}
          email={user.email}
          phone={user.phone}
          service={user.service}
          isEditBtn={connectedUserData.isAdmin}
        />
      </div>
    ));
  };

  const handleWorkServiceChange = (event) => {
    setSelectedWorkService(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  return (
    <>
      <h2> Liste des collaborateurs </h2>
      <div className="filter-container">
        <label className="filter-input">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </label>

        <label className="filter-input">
          rechercher par:
          <select value={searchBy} onChange={handleSearchByChange}>
            <option value="name">Nom</option>
            <option value="location">Localisation</option>
          </select>
        </label>

        <label className="filter-input">
          Services:
          <select
            value={selectedWorkService}
            onChange={handleWorkServiceChange}
          >
            <option value="default">- Aucun - </option>
            <option value="technique">Service technique</option>
            <option value="marketing">Service marketing</option>
            <option value="client">Service client</option>
          </select>
        </label>
      </div>

      <div className="user_table">{returnFiltredList()}</div>
    </>
  );
};

export default WorkerList;
