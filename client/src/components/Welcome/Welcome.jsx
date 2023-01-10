import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import Card from '../Card/Card'



import "./welcome.css";

const Welcome = () => {

    return (<>

        <h1> Bienvenue sur l'intranet</h1>

        <p>la platforme de l'entreprise qui vous permet de retrouver tous vos collaborateurs </p>

        <p>Avez vous dis bonjour à:</p>

        calendar
        <i class="fa-regular fa-calendar"></i>
        <br></br>


        {/* <FontAwesomeIcon icon="fa-solid fa-cake-candles" /> */}


        <Card
            props={

                JSON.parse(
                    '{"id": "37","gender": "male","firstname": "Isaac","lastname": "Renard","email": "isaac.renard@example.com","phone": "05-49-13-09-86",  "birthdate": "1991-09-17",      "city": "Angers",      "country": "France",      "photo": "https://randomuser.me/api/portraits/men/84.jpg",      "service": "Marketing"            }'
                )

            }
        />



        <button>DIRE BONJOUR A QUELQU'UN D'AUTRE</button>



    </>

    )
}


export default Welcome;