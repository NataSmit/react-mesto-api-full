import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useEffect} from 'react';

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"update-avatar"}
      title={"Обновить аватар"}
      buttonName={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        name="avatar"
        className="popup__form-input popup__form-input_type_update-avatar"
        type="url"
        placeholder="https://somewebsite.com/someimage.jpg"
        required
        id="avatar-link-input"
      />
      <span className="avatar-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}
