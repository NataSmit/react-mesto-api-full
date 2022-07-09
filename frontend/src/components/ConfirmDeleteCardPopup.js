import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeleteCardPopup(props) {
  function handleConfirmDeleteCardSubmit(e) {
    e.preventDefault();
    props.onCardDelete();
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"delete"}
      title={"Вы уверены?"}
      buttonName={"Да"}
      onClose={props.onClose}
      onSubmit={handleConfirmDeleteCardSubmit}
    />
  );
}
