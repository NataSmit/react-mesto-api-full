import React from 'react';
import editIcon from '../images/pen.svg';
import addIcon from '../images/plus.svg';
import {api} from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, onCardDeleteConfirm}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__body">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img className="profile__avatar-img" src={currentUser.avatar} alt="Фото профайла"/>
          </div>
          <div className="profile__details">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Редактировать" >               
                <img className="profile__button-item" src={editIcon} alt="Редактировать"/>             
              </button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>       
        <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить">
          <img className="profile__add-image" src={addIcon} alt="Добавить"/>
        </button>
      </section>
      <section className="elements">
        {
          cards.map((card) => (
            
            <Card card={card} key={card._id} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike} 
            onCardDelete={onCardDelete}
            onCardDeleteConfirm={onCardDeleteConfirm}/>))
            
        }

      </section>
    </main>
  )
}

export default Main