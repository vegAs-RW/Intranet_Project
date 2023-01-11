import { useState } from "react";
import { useSelector } from "react-redux";

import "./card.css";

const Card = ({
  lastname,
  firstname,
  birthdate,
  photo,
  email,
  phone,
  service,
}) => {

  const getAge = () => {
    let now = new Date().getTime();
    let birthday = new Date(birthdate).getTime();

    return (
      "(" +
      Math.ceil((now - birthday) / (1000 * 60 * 60 * 24 * 365.25)) +
      " ans)"
    );
  };

  return (
    <div className="card">
      <img style={{ height: "100%" }} src={photo}></img>

      <div className="card_right">
        <div>
          {" "}
          {firstname + " " + lastname} {}
          <span style={{ fontStyle: "italic" }}>{getAge()}</span>{" "}
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

        <div className="card_service">{service.toUpperCase()}</div>
      </div>
    </div>
  );
};

export default Card;
