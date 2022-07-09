export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  
]; 

export const popupViewImage = document.querySelector('.popup-view-image');
export const popupViewImagePhoto = document.querySelector('.popup-view-image__photo-item');
export const popupViewImagePhotoSubtitle = document.querySelector('.popup-view-image__subtitle');
export const wrapper = document.querySelector('.wrapper');
export const formProfile = document.querySelector('.popup__form_type_profile');
export const formTypeCard = document.querySelector('.popup__form_tipe_card');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupSubmitButton = document.querySelector('.popup__submit-btn');
export const cardAddButton = document.querySelector ('.profile__add-button');
export const nameInput = document.querySelector('.popup__form-input_type_name');
export const jobInput = document.querySelector('.popup__form-input_type_activity');
export const popupCardNameInput = document.querySelector('.popup__form-input_type_card-name');
export const popupCardLinkInput = document.querySelector('.popup__form-input_type_card-link');
export const sectionElements = document.querySelector('.elements');
export const avatar = document.querySelector('.profile__avatar');
export const avatarForm = document.querySelector('.popup__form_type_update-avatar')
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
}






const popupCloseButton = document.querySelector('.popup__close-button');

const blockPopup = document.querySelector('.popup_type_profile');

const profileName = document.querySelector('.profile__name');

const profileProfession = document.querySelector('.profile__profession');

const cardTemplate = document.querySelector('.card-template').content;

const popupAddCard = document.querySelector('.popup_tipe_card');
const popupCardCloseButton = document.querySelector('.popup__close-button_type_card');

const popupViewImageCloseButton = document.querySelector('.popup-view-image__close-button');

const popups = Array.from(document.querySelectorAll('.popup'));
