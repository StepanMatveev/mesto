//общая валидация
function enableValidation(obj) {
    const formElem = Array.from(document.querySelectorAll(obj.formSelector));
    formElem.forEach (formElem => {
        const inputElements = Array.from(formElem.querySelectorAll(obj.inputSelector));
        const saveButton = formElem.querySelector(obj.submitButtonSelector);
        inputElements.forEach (input => {
            input.addEventListener('input', e => handleCheckInput(e, obj.inputErrorClass, obj.errorClass))
        })
        formElem.addEventListener('input', () => handleCheckSubmit(formElem, saveButton, obj.inactiveButtonClass))
    })
}

//Проверка инпутов
function handleCheckInput(e, inputErrorClass, errorClass) {
    const input = e.target;
    const InputValid = input.checkValidity();
    if (InputValid) {
        hideInputError(input, inputErrorClass, errorClass);
    } else {
        showInputError(input, inputErrorClass, errorClass);
    }
}

//Проверка кнопки
function handleCheckSubmit(formElement, submitButton, inactiveClass) {
    const errors = !formElement.checkValidity();
    submitButton.disabled = errors;
    submitButton.classList.toggle(inactiveClass, errors);
}

//показать error
function showInputError(input, inputErrorClass, errorClass) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
}

//Скрыть error
function hideInputError(input, inputErrorClass, errorClass) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
}

