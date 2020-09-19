export default class Card {
    constructor (card, userId, cardSelector, { handleCardClick }, { handleDeleteCard }, { handlePutLike }, { handleRemoveLike }) {
        this._name = card.name;
        this._link = card.link;
        this._likes = card.likes;
        this._cardId = card._id;
        this._userId = userId;
        this._owner = card.owner;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handlePutLike = handlePutLike;
        this._handleRemoveLike = handleRemoveLike;
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
        this._element.querySelector('.elements__place-counter').textContent = this._likes.length;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._setEventListeners();
        this._likes.forEach (item => {
            if (item._id === this._userId) {
                this._likeButton.classList.add('elements__place-button_active');
            }
        })
        if (this._owner._id !== this._userId) {
            this._element.querySelector('.element__remove-button').classList.add('element__remove-button_disabled');
        } 
        return this._element;  
    }

    //функционал карточки
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.elements__place-button');
        this._likeButton.addEventListener('click', () => {this._likeCard();
        });
        this._element.querySelector('.element__remove-button').addEventListener('click', () => {
        this._handleDeleteCard();
        });
        this._element.querySelector('.elements__place-image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard() {
        if (this._element.querySelector('.elements__place-button').classList.contains('elements__place-button_active')) {
            this._handleRemoveLike( this._cardId);
            this._element.querySelector('.elements__place-button').classList.remove('elements__place-button_active');
            this._element.querySelector('.elements__place-counter').textContent = this._likes.length -= 1;
        } else {
            this._handlePutLike( this._cardId);
            this._element.querySelector('.elements__place-button').classList.add('elements__place-button_active');
            this._element.querySelector('.elements__place-counter').textContent = this._likes.length += 1;
        }
    }
};    