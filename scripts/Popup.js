export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    openPopup() {
        this._popup.classList.add('popup_viev_open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popup.classList.remove('popup_viev_open');
        document.removeEventListener('keydown', this._handleEscClose);

    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    }

    _handleButtonClose = (evt) => {
        if (evt.target.classList.contains('popup__close-button')) {
            this.closePopup();
        }
    }

    _handleOverlayClose = (evt) => {
        if (!evt.target.closest('.popup__container')) {
            this.closePopup();
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleButtonClose);
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
    }
}