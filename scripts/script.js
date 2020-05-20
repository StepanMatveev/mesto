// Присваиваем необходимые переменные
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Берем значения из полей ввода формы
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_occupation');

//Функция открытия\закрытия
function openClosePopup() {
    if (popup.classList.contains('popup_viev_open')) { 
        popup.classList.remove('popup_viev_open');
        popup.classList.add('popup_viev_close');
    }  //проверяем открыт ли попап и закрываем если нужно
    else {
        popup.classList.remove('popup_viev_close');
        popup.classList.add('popup_viev_open');
        nameInput.value = profileName.textContent; 
        jobInput.value = profileJob.textContent;
    } // открываем если закрыт и берем значения для полей ввода из профиля
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
        openClosePopup();
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
//Назначяем логику кнопок редактировать и закрыть
editButton.addEventListener('click', openClosePopup);
closeButton.addEventListener('click', openClosePopup);


