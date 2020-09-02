export default class FormValidator {
    constructor(obj, formElement) {
        this._formElement = formElement;
        this._inputSelector = obj.inputSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj._inputErrorClass;
        this._errorClass = obj.errorClass;
        this._submitButton = this._formElement.querySelector(obj.submitButtonSelector);
    }

    //общая валидация и сброс ошибок
    enableValidation() { 
        const inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));   

        inputElements.forEach (input => {
            input.addEventListener('input', e => this._handleCheckInput(e, this._inputErrorClass, this._errorClass));
        });
        this._formElement.addEventListener('input', () => this._handleCheckSubmit(this._formElement, this._submitButton, this._inactiveButtonClass));
        //сброс ошибок
        inputElements.forEach (input => {
            this._hideInputError(input, this._inputErrorClass, this._errorClass);
        });
        this._handleCheckSubmit(this._formElement, this._submitButton, this._inactiveButtonClass);
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
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(inputErrorClass);
        error.classList.add(errorClass);
        error.textContent = input.validationMessage;
    }
    
    //Скрыть error
    _hideInputError(input, inputErrorClass, errorClass) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(inputErrorClass);
        error.classList.remove(errorClass);
        error.textContent = '';
    }


}