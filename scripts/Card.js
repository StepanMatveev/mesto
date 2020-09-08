export default class Card {
    constructor (name, link, cardSelector, { handleCardClick }) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    //разметка карточки
    _getTemplate() {
        const cardElem = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.elements__place')
        .cloneNode(true);
        return cardElem;
    }

    //Создаем карточку из полученных данных
    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__place-title').textContent = this._name;
        const cardImage = this._element.querySelector('.elements__place-image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
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
            this._handleCardClick(this._name, this._link);
        });
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard(likeButton) {
        likeButton.classList.toggle('elements__place-button_active');
    }
}