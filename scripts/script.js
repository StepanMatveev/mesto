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

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const elemList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.pic-card').content;

// Находим форму в DOM
const formProfile = document.querySelector('.popup__form_profile');
const formAddPlace = document.querySelector('.popup__form_add-place');
// Берем значения из полей ввода формы
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_occupation');
const inputTitle = document.querySelector('.popup__input_pic-name');
const inputLink = document.querySelector('.popup__input_link');


//создаем карточку
function createCard (name, link) {
    const picCard = cardTemplate.cloneNode(true);
    picCard.querySelector('.elements__place-button').addEventListener('click', function(e){
        e.target.classList.toggle('elements__place-button_active');
    });
    picCard.querySelector('.element__remove-button').addEventListener('click', function(e) {
        e.target.closest('.elements__place').remove();
    });
    const elementsPlaceImage = picCard.querySelector(".elements__place-image");
    const elementsPlaceTitle = picCard.querySelector(".elements__place-title");
    elementsPlaceTitle.textContent = name;
    elementsPlaceImage.alt = name;
    elementsPlaceImage.src = link;
    elementsPlaceImage.addEventListener('click', function() {
        openPopup(popupImage)
        document.querySelector('.popup__image-picture').src = link;
        document.querySelector('.popup__image-picture').alt = name;
        document.querySelector('.popup__image-subtitle').textContent = name; 
    } );

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

editButton.addEventListener('click', popupProfileOpen);
addButton.addEventListener('click', popupAddOpen);
addButton.addEventListener('click', popupAddOpen);


