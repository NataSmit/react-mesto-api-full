import React, { useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);


  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDeleteConfirm(props.card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i === currentUser._id);


  return (
    <article className="elements__card element" key={props.card.id}>
      <div className="element__photo" onClick={handleClick}>
        <img
          className="element__photo-img"
          src={props.card.link}
          alt={props.card.name}
        />
      </div>
      <div className="element__subtitle">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__likes">
          <button
            onClick={handleLikeClick}
            className={`element__icon ${
              isLiked ? "element__icon_state_active" : ""
            }`}
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="element__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
      <button
        className={`element__delete-button ${
          isOwn ? "" : "element__delete-button_hidden"
        }`}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
    </article>
  );
}
