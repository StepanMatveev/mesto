
const popups = document.querySelector('.popups');

// функции закрытия
function closePopup(el) {
    el.classList.remove('popup_viev_open');
    el.removeEventListener('click', closePopupButton);
    document.removeEventListener('keydown', closePopupEsc);
    el.removeEventListener('mousedown', closeByOverlay);
}

function closePopupButton(e) {
    if (e.target.classList.contains('popup__close-button') || e.target.classList.contains('popup__save-button') )  {
        const elem = e.target.closest('.popup');
        closePopup(elem);
    }
}

function closePopupEsc(e) {
    const elem = popups.querySelector('.popup_viev_open');
    if (e.key === "Escape") {
        closePopup(elem);
    }
}

 function closeByOverlay(e) {
    if (!e.target.closest('.popup__container')) {
        const elem = popups.querySelector('.popup_viev_open');
        closePopup(elem);
    }
}

//экспорт функций закрытия 
export {closePopupButton,closePopupEsc ,closeByOverlay};