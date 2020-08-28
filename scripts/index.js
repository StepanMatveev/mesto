import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
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
    }
];

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
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.pic-card');
    const cardEl = card.creatCard();
    elemList.prepend(cardEl);
});

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

// функции закрытия
function closePopup(el) {
    el.classList.remove('popup_viev_open');
    el.removeEventListener('click', closePopupButton);
    document.removeEventListener('keydown', closePopupEsc);
    el.removeEventListener('mousedown', closeByOverlay);
}

function closePopupButton(e) {
    if (e.target.classList.contains('popup__close-button') || e.target.classList.contains('popup__save-button') )  {
        const elem = e.target.closest('.popup');
        closePopup(elem);
    }
}

function closePopupEsc(e) {
    const elem = popups.querySelector('.popup_viev_open');
    if (e.key === "Escape") {
        closePopup(elem);
    }
}

function closeByOverlay(e) {
    if (!e.target.closest('.popup__container')) {
        const elem = popups.querySelector('.popup_viev_open');
        closePopup(elem);
    }
}

//экспорт функций закрытия для увеличеной картинки, тк функционал ее открытия генерируеться в классе Card
export {closePopupButton,closePopupEsc ,closeByOverlay};

// Обработчики «отправки» форм
function formProfileHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
}

function formAddHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
    const card = new Card(inputTitle.value, inputLink.value, '.pic-card');
    const cardEl = card.creatCard();
    elemList.prepend(cardEl);
}

//Назначяем кнопки и слушатели
editButton.addEventListener('click', popupProfileOpen);
addButton.addEventListener('click', popupAddOpen);
formProfile.addEventListener('submit', formProfileHandler);
formAddPlace.addEventListener('submit', formAddHandler);