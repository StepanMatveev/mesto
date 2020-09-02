import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js'
import {closeByOverlay, closePopupButton, closePopupEsc} from './closingFunctionality.js';


// Присваиваем необходимые переменные
const popups = document.querySelector('.popups');
const popupProfile = document.querySelector('.popup__profile');
const popupAddPlace = document.querySelector('.popup__add-place');
const popupImage = document.querySelector('.popup__image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const saveProfileButton = document.querySelector('.popup__save-button_profile');
const savePlaceButton = document.querySelector('.popup__save-button_place');

//переменные заготовок
const elemList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.pic-card').content;

// Находим форму в DOM
const formProfile = document.querySelector('.popup__form_profile');
const formAddPlace = document.querySelector('.popup__form_add-place');

// Берем значения из полей ввода формы
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_occupation');
const inputTitle = document.querySelector('.popup__input_pic-name');
const inputLink = document.querySelector('.popup__input_link');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const imgPicture = document.querySelector('.popup__image-picture');
const imgSubtitle = document.querySelector('.popup__image-subtitle');

// объекты валидации
const validationObject = {
    formElement: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};



function renderCard(cards) {
    cards.forEach((item) => {
        const card = new Card(item.name, item.link, '.pic-card');
        const cardEl = card.createCard();
        elemList.prepend(cardEl);
    });
}
renderCard(initialCards);

function openPopup(el) {
    el.classList.add('popup_viev_open');
    el.addEventListener('click', closePopupButton);
    document.addEventListener('keydown', closePopupEsc);
    el.addEventListener('mousedown', closeByOverlay);
}

function popupAddOpen() {
    inputTitle.value = '';
    inputLink.value = '';
    const validation = new FormValidator(validationObject, formAddPlace);
    validation.enableValidation();
    openPopup(popupAddPlace);
}

function popupProfileOpen() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    const validation = new FormValidator(validationObject, formProfile);
    validation.enableValidation();
    openPopup(popupProfile);
}



// Обработчики «отправки» форм
function formProfileHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
}

function formAddHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
    const card = new Card(inputTitle.value, inputLink.value, '.pic-card');
    const cardEl = card.createCard();
    elemList.prepend(cardEl);
}

//Назначяем кнопки и слушатели
editButton.addEventListener('click', popupProfileOpen);
addButton.addEventListener('click', popupAddOpen);
formProfile.addEventListener('submit', formProfileHandler);
formAddPlace.addEventListener('submit', formAddHandler);