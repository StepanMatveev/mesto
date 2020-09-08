import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imgSelector, titleSelection) {
        super(popupSelector);
        this._imgSelector = imgSelector;
        this._titleSelection = titleSelection;
    }
    openPopup(name, link) {
        super.openPopup();
        this._popup.querySelector(this._imgSelector).src = link;
        this._popup.querySelector(this._imgSelector).alt = name;
        this._popup.querySelector(this._titleSelection).textContent = name;
    }
}