import React from "react";
import closeIcon from "../images/Close-Icon.svg";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          action="/"
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit-btn" type="submit">
            {props.buttonName}
          </button>
        </form>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
        >
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </div>
  );
}
