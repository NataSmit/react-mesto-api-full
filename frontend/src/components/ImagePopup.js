import React from "react";
import closeIcon from "../images/Close-Icon.svg";

export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup-view-image ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup-view-image__container">
        <figure className="popup-view-image__figure">
          <img
            className="popup-view-image__photo-item"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup-view-image__subtitle">
            {props.card.name}
          </figcaption>
        </figure>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button popup-view-image__close-button"
          aria-label="Закрыть"
        >
          <img
            className="popup__close-icon popup-view-image__close-icon"
            src={closeIcon}
            alt="Закрыть"
          />
        </button>
      </div>
    </div>
  );
}
