import React from "react";
import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import logoHeader from "../images/logo.svg";
import editIcon from "../images/pen.svg";
import addIcon from "../images/plus.svg";
import closeIcon from "../images/Close-Icon.svg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { apiAuth } from "../utils/ApiAuth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToBeDeleted, setCardToBeDeleted] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({ successful: false, message: "" });
  const history = useHistory();

  useEffect(() => {
   api
     .getUserData()
     .then((res) => {
       setCurrentUser(res);
     })
     .catch((err) => console.log(err))
   api
     .getInitialCards()
     .then((res) => {
       setCards(res);
     })
     .catch((err) => console.log(err))
   checkToken();
  }, []);

  function handleSignIn(password, email) {
    apiAuth
      .login(password, email)
      .then((data) => {
        console.log('handleSignIn: data:', data)
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .then((data) => {
        if (data.token) {
          handleLogin();
          history.push("/");
        }
      })
      .catch((err) => {
        setErrorMessage(err.toString());
      });
  }

  function handleRegistration(password, email) {
    apiAuth
      .registration(password, email)
      .then((res) => {
        if (res) {
         
          setIsInfoTooltipOpen(true);
          setMessage({
            successful: true,
            message: "Вы успешно зарегистрировались!",
          });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setMessage({
          successful: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function redirectToLoginAfterRegistration() {
    if (message.successful) {
      redirectToLogin();
    }
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    redirectToLoginAfterRegistration();
  }

  function handleLogin() {
    setLoggedIn(true);
    checkToken();
    
  }

  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        apiAuth
          .getUserData(jwt)
          .then((data) => {
          
            if (data) {
              setLoggedIn(true);
              history.push("/");
              setUserEmail(data.email);
              setCurrentUser(data)          
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  function signOut() {
    apiAuth.logout()
      .then((res) => console.log(res))
      .catch(err => console.log(err))
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  function redirectToRegistration() {
    history.push("/signup");
  }

  function redirectToLogin() {
    history.push("/signin");
  }

  function handleConfirmDeleteClick(card) {
    setCardToBeDeleted(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.handleLikeClick(card._id, isLiked)
    .then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c)),
      )
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    api
      .deleteCard(cardToBeDeleted._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== cardToBeDeleted._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(info) {
    api
      .editProfile(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(obj) {
    api
      .updateAvatar(obj)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddCard(obj) {
    api
      .addCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <Switch>
            <Route path="/signup">
              <Header buttonName={"Войти"} handleClick={redirectToLogin} />
              <Register onSignup={handleRegistration} />
            </Route>

            <Route path="/signin">
              <Header
                buttonName={"Регистрация"}
                handleClick={redirectToRegistration}
              />
              <Login onSignIn={handleSignIn} errorMessage={errorMessage} />
            </Route>

            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Header
                buttonName={"Выйти"}
                handleClick={signOut}
                userEmail={userEmail}
              />
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardDeleteConfirm={handleConfirmDeleteClick}
                cards={cards}
              />
            </ProtectedRoute>
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={cardToBeDeleted}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          message={message.message}
          successful={message.successful}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
