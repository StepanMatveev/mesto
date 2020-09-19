import Popup from './Popup.js';

export default class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);        
    }

    setHandleSubmit(foo) {
        this._handleSubmit = foo;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
        super.setEventListeners();
    }
}