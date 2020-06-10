const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Присваиваем необходимые переменные
const popups = document.querySelector('.popups');
const popupProfile = document.querySelector('.popup__profile');
const popupAddPlace = document.querySelector('.popup__add-place');
const popupImage = document.querySelector('.popup__image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__save-button');
const submitProfile = document.querySelector('.popup__save-button_profile');
const submitPlace = document.querySelector('.popup__save-button_place');
const delButton = document.querySelector('.elements__remove');
const likeButton = document.querySelector('.elements__place-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const elemList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.pic-card').content;

// Находим форму в DOM
const formProfile = document.querySelector('.popup__form_profile');
const formAddPlace = document.querySelector('.popup__form_add-place');
// Берем значения из полей ввода формы
let inputName = document.querySelector('.popup__input_name');
let inputJob = document.querySelector('.popup__input_occupation');
let inputTitle = document.querySelector('.popup__input_pic-name');
let inputLink = document.querySelector('.popup__input_link');


//создаем карточку
function createCard (name, link) {
    const picCard = cardTemplate.cloneNode(true);
    const elementsPlaceImage = picCard.querySelector(".elements__place-image");
    const elementsPlaceTitle = picCard.querySelector(".elements__place-title");
    elementsPlaceTitle.textContent = name;
    elementsPlaceImage.src = link;
    return picCard;
};
//добавляем карточку в начало списка
function renderCard(e, el) {
    e.prepend(el);
};
//берем карточки из массива
initialCards.forEach(function(el) {
    renderCard(elemList, createCard(el.name, el.link));
});

function like (e) {
    if (e.target.classList.contains('elements__place-button')) {
        e.target.classList.toggle('elements__place-button_active');
    }
};
//удаляем ближайший элемент от кнопки
function deleteCard(e) {
    if (e.target.classList.contains('element__remove-button')){
        e.target.closest('.elements__place').remove();
    }
};
//общее открытие попапа 
function openPopup(e) {
    e.classList.add('popup_viev_open');
};

function popupAddOpen() {
    openPopup(popupAddPlace);
};

function popupProfileOpen() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupProfile);
};
// открытие картинки
function openCard(e) {
    if (e.target.classList.contains('elements__place-image')) {
        const elemImg = e.target.getAttribute('src');
        const elemTitle = e.target.closest('.elements__place').querySelector('.elements__place-title');
        const img = document.querySelector('.popup__image-picture');
        const title = document.querySelector('.popup__image-subtitle');
        img.src = elemImg;
        title.textContent = elemTitle.textContent;
        openPopup(popupImage);
        
    }
};
//закрываем для всех
function closePopup(e) {
    if (e.target.classList.contains('popup__close-button') || e.target.classList.contains('popup__save-button') )  {
        const elem = e.target.closest('.popup');
        elem.classList.remove('popup_viev_open');
    }
};



// Обработчики «отправки» форм
function formProfileHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
};

function formAddHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
    renderCard(elemList, createCard(inputTitle.value, inputLink.value));
};

formProfile.addEventListener('submit', formProfileHandler);
formAddPlace.addEventListener('submit', formAddHandler);

//Назначяем кнопки и слушатели
popups.addEventListener('click', closePopup);
elemList.addEventListener('click', like);
elemList.addEventListener('click', like);
elemList.addEventListener('click', deleteCard);
elemList.addEventListener('click', openCard);

editButton.addEventListener('click', popupProfileOpen);
addButton.addEventListener('click', popupAddOpen);
addButton.addEventListener('click', popupAddOpen);


