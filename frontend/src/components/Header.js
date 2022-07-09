import React from "react";
import logoHeader from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <a href="#">
        <img className="header__logo" src={logoHeader} alt="Логотип Место" />
      </a>
      <div className="header__container">
        <p className="header__user">{props.userEmail}</p>
        <button className="header__button" type="button" onClick={props.handleClick}>{props.buttonName}</button>
      </div>
    </header>
  );
}

export default Header;
