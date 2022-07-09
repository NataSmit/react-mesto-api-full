import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSignup(password, email);
  }

  return (
    <div className="popup__container popup__container_theme_black">
      <h2 className="popup__title">Регистрация</h2>
      <form
        className="popup__form"
        action="/"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          value={email}
          onChange={handleEmailChange}
          className="popup__form-input popup__form-input_theme_black popup__form-input_type_name"
          type="text"
          required
          minLength="2"
          maxLength="100"
          placeholder="Email"
        />

        <input
          value={password}
          onChange={handlePasswordChange}
          className="popup__form-input popup__form-input_theme_black popup__form-input_type_activity"
          type="password"
          required
          minLength="2"
          maxLength="100"
          placeholder="Пароль"
        />

        <button
          className="popup__submit-btn popup__submit-btn_theme_black"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <Link to="/signin" className="popup__redirect">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
