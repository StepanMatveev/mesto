import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWIthForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {initialCards} from '../utils/initialCards.js';
import '../pages/index.css';

// Присваиваем необходимые переменные
const popupProfileSelector = '.popup__profile';
const popupCardSelector = '.popup__add-place';
const popupPhotoSelector = '.popup__image';
const imgSelector = '.popup__image-picture'
const titleSelection = '.popup__image-subtitle';
const picCard = '.pic-card';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//переменные заготовок
const elemList = '.elements__list';

// Находим форму в DOM
const formProfileElement = document.querySelector('.popup__form_profile');
const formCardsElement = document.querySelector('.popup__form_add-place');

// Берем значения из полей ввода формы
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_occupation');
const titleInput = document.querySelector('.popup__input_pic-name');
const linkInput = document.querySelector('.popup__input_link');


// объекты валидации
const validationObject = {
    formElement: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const profileSelectors = {
    name: '.profile__title',
    job: '.profile__subtitle'
};


//классы валидации
const profileValidation = new FormValidator(validationObject, formProfileElement);
const cardsValidation = new FormValidator(validationObject, formCardsElement);

//Включили валидацию
profileValidation.enableValidation();
cardsValidation.enableValidation();

//Эинформации о пользователе
const userInfo = new UserInfo(profileSelectors);

//рисуем карточки
const cardsList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, picCard, { 
            handleCardClick: () => {
                popupPhoto.openPopup(item.name, item.link);
        } 
    });
        const cardEl = card.createCard();
        cardsList.addItem(cardEl);
    }
}, elemList);

//попап редактирования профиля
const popupProfile = new PopupWithForm(popupProfileSelector, { handleFormSubmit() {
    popupProfile.closePopup();
    userInfo.setUserInfo(nameInput.value, jobInput.value);
}})

//попап добавления фото
const popupAddCard = new PopupWithForm(popupCardSelector, { handleFormSubmit() {//обработчик сабмита формы
    const card = new Card(titleInput.value, linkInput.value, picCard,  { 
        handleCardClick: (name, link) => {
            popupPhoto.openPopup(name, link);
        }
    });
    const cardEl = card.createCard();
    cardsList.addItem(cardEl);
    popupAddCard.closePopup();
    }
})

//попап с картинкой
const popupPhoto = new PopupWithImage(popupPhotoSelector, imgSelector, titleSelection);
popupPhoto.setEventListeners();

//слушатели
popupAddCard.setEventListeners();

addButton.addEventListener('click', () => {
    popupAddCard.openPopup();
    cardsValidation.resetErrors();//обнулили валидации
});

popupProfile.setEventListeners();

editButton.addEventListener('click', () => {
    popupProfile.openPopup();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job; 
    profileValidation.resetErrors();//обнулили валидации
});

cardsList.renderItems();