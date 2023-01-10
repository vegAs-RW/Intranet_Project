import { useState } from 'react'

import './card.css'





const Card = ({ props }) => {

    const isLogged = true


    const getAge = () => {
        let now = new Date().getTime()
        let birthday = new Date(props.birthdate).getTime()


        console.log(birthday, "now :", now)








        return "(" + Math.ceil((now - birthday) / (1000 * 60 * 60 * 24 * 365.25)) + " ans)"
    }


    return (


        <div className='card'>

            <img style={{ height: "100%" }} src={props.photo}></img>

            <div className='card_right'>

                <div>  {props.firstname + ' ' + props.lastname}  { }
                    <span style={{ fontStyle: "italic", }}>{getAge()}</span>   </div>

                <div className='card_line'>
                    <i class="fa-solid fa-envelope"></i>
                    {props.email}
                </div>

                <div className='card_line'>
                    <i class="fa-solid fa-phone-flip"></i>
                    {props.phone}
                </div>

                <div className='card_line'>
                    <i class="fa-solid fa-cake-candles"></i>
                    {props.birthdate}
                </div>

                <div className='card_service'>
                    {props.service.toUpperCase()}
                </div>

            </div>



        </div>
    )
}

export default Card
