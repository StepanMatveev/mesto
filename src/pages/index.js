import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js'
import '../pages/index.css';

// Присваиваем необходимые переменные
const popupProfileSelector = '.popup__profile';
const popupCardSelector = '.popup__add-place';
const popupPhotoSelector = '.popup__image';
const popupDeleteSelector = '.popup__delete';
const popupAvatarSelector = '.popup__edit-avatar';
const imgSelector = '.popup__image-picture'
const titleSelection = '.popup__image-subtitle';
const picCard = '.pic-card';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-overlay');

//переменные заготовок
const elemList = '.elements__list';
const placeTemplate = '.pic-card';

// Находим форму в DOM
const formProfileElement = document.querySelector('.popup__form_profile');
const formCardsElement = document.querySelector('.popup__form_add-place');
const formDeleteElement = document.querySelector('.popup__form_delete');
const formAvatarElement = document.querySelector('.popup__form_edit-avatar');

// Берем значения из полей ввода формы
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_occupation');
const titleInput = document.querySelector('.popup__input_pic-name');
const linkInput = document.querySelector('.popup__input_link');


// объекты валидации
const validationObject = {
    formElement: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const profileSelectors = {
    name: '.profile__title',
    job: '.profile__subtitle',
    avatar: '.profile__avatar'
};

const config = { 
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: {
      authorization: '33752b78-529e-42f8-8e5f-3bdbc1a4cb7d',
      'Content-Type': 'application/json'
    }
}
//Api ккласс
const api = new Api(config);

//классы валидации
const profileValidation = new FormValidator(validationObject, formProfileElement);
const cardsValidation = new FormValidator(validationObject, formCardsElement);
const avatarValidation = new FormValidator(validationObject, formAvatarElement);

//Включили валидацию
profileValidation.enableValidation();
cardsValidation.enableValidation();
avatarValidation.enableValidation();

//класс информации о пользователе
const userInfo = new UserInfo(profileSelectors);

//Загрузка информации о пользователе с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((data) => {
    userInfo.setUserInfo(data[0]);
    userInfo.setAvatar(data[0].avatar)
    const userId = data[0]._id;

    //рисуем карточки
    const cardsList = new Section ({
        items: data[1],
        renderer: (item) => {
            const card = new Card(item, userId, placeTemplate, { 
                handleCardClick: () => {//клика на фото
                    popupPhoto.openPopup(item.name, item.link);
            }
        }, { handleDeleteCard: () => {//удаление
            popupDelete.openPopup();
            popupDelete.setHandleSubmit(function(){
                    api.deleteCard(item._id);
                    card.deleteCard();
                    popupDelete.closePopup();
                });
            }
        }, { handlePutLike: () => {//добавление лайка
            api.putLike(item._id);
            }
        }, { handleRemoveLike: () => {//удаление лайка
            api.removeLike(item._id);
        } 
    });
        const cardEl = card.createCard();
        cardsList.addItem(cardEl);
        }
    }, 
    elemList);
    cardsList.renderItems();

    //попап добавления фото
    const popupAddCard = new PopupWithForm(popupCardSelector, { handleFormSubmit() {//обработчик сабмита формы
        popupAddCard.renderLoading(true);
        api.addCard(titleInput.value, linkInput.value)
        .then((data) => {
            const card = new Card(data, userId, placeTemplate,  
            { 
                handleCardClick: (name, link) => {//клик на фото
                    popupPhoto.openPopup(name, link);
                }
            }, { handleDeleteCard: () => {//удаления карточки
                popupDelete.openPopup();
                popupDelete.setHandleSubmit(function() {
                    api.deleteCard(data._id);
                    card.removeCard();
                    popupDelete.closePopup();
                });
            }
            }, { handlePutLike: () => {
                api.putLike(data._id);
                }
            }, { handleRemoveLike: () => {
                api.removeLike(data._id);
                } 
            });
            const cardEl = card.createCard();
            cardsList.addItem(cardEl);
            popupAddCard.closePopup();
            },)
            
        .catch((err) => {
            console.log(err);
            return Promise.reject(err.message);
        })
        .finally(() => {
            popupAddCard.renderLoading(false);
            popupAddCard.closePopup();
        })
        }
    })
    popupAddCard.setEventListeners();

    addButton.addEventListener('click', () => {
        popupAddCard.openPopup();
        cardsValidation.resetErrors();//обнулили валидации
    });

})
.catch((err) => {
    console.log('_handleResponseError');
    return Promise.reject(err.message);
})


//попап редактирования профиля
const popupProfile = new PopupWithForm(popupProfileSelector, { handleFormSubmit() {
    popupProfile.renderLoading(true);
    api.editUserInfo(nameInput.value, jobInput.value)
    .then((data => {
        userInfo.setUserInfo({name: data.name, about: data.about});
    }))
    .catch((err) => {
        console.log('_handleResponseError');
        return Promise.reject(err.message);
    })
    .finally(() => {
        popupProfile.renderLoading(false);
        popupProfile.closePopup();
    })
    popupProfile.closePopup();
}})

//попап с картинкой
const popupPhoto = new PopupWithImage(popupPhotoSelector, imgSelector, titleSelection);

//попап удаления карточки
const popupDelete = new PopupDelete(popupDeleteSelector);

const popupAvatar = new PopupWithForm(popupAvatarSelector, { handleFormSubmit(data) {
    popupAvatar.renderLoading(true);
    api.changeAvatar(data.link)
    .then((data => {
        userInfo.setAvatar(data.avatar);
    }))
    .catch((err) => {
        console.log('_handleResponseError');
        return Promise.reject(err.message);
    })
    .finally(() => {
        popupAvatar.renderLoading(false);
        popupAvatar.closePopup();
    })
    
}})


//слушатели

popupProfile.setEventListeners();
popupPhoto.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();



editButton.addEventListener('click', () => {
    popupProfile.openPopup();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job; 
    profileValidation.resetErrors();//обнулили валидации
});

avatarButton.addEventListener('click', () => {
    popupAvatar.openPopup();
    avatarValidation.resetErrors();
});
