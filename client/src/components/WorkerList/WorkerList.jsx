import { useState, useEffect } from 'react';
import Card from "../Card/Card";
import { useSelector } from "react-redux";


import "./workerList.css";

import { useNavigate } from "react-router-dom";

const WorkerList = () => {

    const isLogged = useSelector(state => state.user.token)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate("/");
        }
    }, [isLogged]);



    const allUser = useSelector((state) => state.user.allUser);
    const connectedUserData = useSelector((state) => state.user.user);


    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    const [selectedWorkService, setSelectedWorkService] = useState('default');



    const returnFiltredList = () => {

        if (!allUser) { return <> nous rencontrons un problème,merci de rafraichir la page </> }

        let filtredUser = allUser

        if (selectedWorkService != "default") {
            filtredUser = filtredUser.filter(user => user.service.toLowerCase() === selectedWorkService)
        }

        if (searchQuery !== "") {
            if (searchBy === "name") {
                filtredUser = filtredUser.filter(user => user.firstname.toLowerCase().includes(searchQuery) || user.lastname.toLowerCase().includes(searchQuery.toLowerCase()))
            }

            if (searchBy === "location") {
                filtredUser = filtredUser.filter(user => user.city.toLowerCase().includes(searchQuery) || user.country.toLowerCase().includes(searchQuery.toLowerCase()))
            }
        }



        return filtredUser.map((user, Key) =>
            <div key={Key} className="user_table_card" >

                <Card key={user.id} className="user_table_card"
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
            </div>)
    }

    const handleWorkServiceChange = (event) => {
        setSelectedWorkService(event.target.value);
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
    };

    return (<>
        <h2> Liste des collaborateurs </h2>
        <div className='filter-container'>








            <label className='filter-input' >

                <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
            </label>

            <label className='filter-input'>
                rechercher par:
                <select value={searchBy} onChange={handleSearchByChange}>
                    <option value="name">Nom</option>
                    <option value="location">Localisation</option>
                </select>
            </label>

            <label className='filter-input'>
                Services:
                <select value={selectedWorkService} onChange={handleWorkServiceChange}>
                    <option value="default">- Aucune - </option>
                    <option value="technique">Service technique</option>
                    <option value="marketing">Service marketing</option>
                    <option value="client">Service client</option>
                </select>
            </label>
        </div>



        <div>

        </div>
        <div className='user_table'>
            {returnFiltredList()}
        </div>


    </>
    );
};

export default WorkerList;