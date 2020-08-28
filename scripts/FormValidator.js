export default class FormVaidation {
    constructor(obj, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj._inputErrorClass;
        this._errorClass = obj.errorClass;
        this._submitButton = this._formSelector.querySelector(obj.submitButtonSelector);
    }

    //общая валидация и сброс ошибок
    enableValidation() { 
        const inputElements = Array.from(this._formSelector.querySelectorAll(this._inputSelector));   

        inputElements.forEach (input => {
            input.addEventListener('input', e => this._handleCheckInput(e, this._inputErrorClass, this._errorClass));
        });
        this._formSelector.addEventListener('input', () => this._handleCheckSubmit(this._formSelector, this._submitButton, this._inactiveButtonClass));
        //сброс ошибок
        inputElements.forEach (input => {
            this._hideInputError(input, this._inputErrorClass, this._errorClass);
        });
        this._handleCheckSubmit(this._formSelector, this._submitButton, this._inactiveButtonClass);
    }

        //Проверка инпутов
    _handleCheckInput(evt, inputErrorClass, errorClass) {
        const input = evt.target;
        const isInputValid = input.checkValidity();
        if (isInputValid) {
            this._hideInputError(input, inputErrorClass, errorClass);
        } else {
            this._showInputError(input, inputErrorClass, errorClass);
        }
    }
       
    //Проверка кнопки
    _handleCheckSubmit(formSelector, submitButton, inactiveClass) {
        const hasErrors = !formSelector.checkValidity();
        submitButton.disabled = hasErrors;
        submitButton.classList.toggle(inactiveClass, hasErrors);
    }

    //показать error
    _showInputError(input, inputErrorClass, errorClass) {
        const error = document.querySelector(`#${input.id}-error`);
        input.classList.add(inputErrorClass);
        error.classList.add(errorClass);
        error.textContent = input.validationMessage;
    }
    
    //Скрыть error
    _hideInputError(input, inputErrorClass, errorClass) {
        const error = document.querySelector(`#${input.id}-error`);
        input.classList.remove(inputErrorClass);
        error.classList.remove(errorClass);
        error.textContent = '';
    }


}