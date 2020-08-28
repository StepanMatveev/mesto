import {closePopupButton, closePopupEsc, closeByOverlay} from './index.js';


// необходимые данные и попап
const popupImage = document.querySelector('.popup__image');
const image = popupImage.querySelector('.popup__image-picture');
const title = popupImage.querySelector('.popup__image-subtitle');

export default class Card {
    constructor (name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    //разметка карточки
    _getTemplate() {
        const cardElem = document.querySelector(this._cardSelector)
        .content
        .querySelector('.elements__place')
        .cloneNode(true);
        return cardElem;
    }

    //Создаем карточку из полученных данных
    creatCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__place-image').src = this._link;
        this._element.querySelector('.elements__place-title').textContent = this._name;
        this._setEventListeners();
        return this._element; 
    }

    //функционал карточки
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.elements__place-button');
        this._likeButton.addEventListener('click', () => {this._likeCard(this._likeButton);
        });
        this._element.querySelector('.element__remove-button').addEventListener('click', () => {
        this._deleteCard();
        });
        this._element.querySelector('.elements__place-image').addEventListener('click', () => {
            this._openPopupImage();    
        });
    }

    _openPopupImage() {
        popupImage.classList.add('popup_viev_open');
        image.src = this._link;
        title.textContent = this._name;
        popupImage.addEventListener('click', closePopupButton);
        document.addEventListener('keydown', closePopupEsc);
        popupImage.addEventListener('mousedown', closeByOverlay);
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard(likeButton) {
        likeButton.classList.toggle('elements__place-button_active');
    }
}