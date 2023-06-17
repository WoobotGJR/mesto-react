import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null)

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
        // console.log("avatar-edit-popup - opened", isEditAvatarPopupOpen)
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
        // console.log("edit-popup - opened")
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
        // console.log("add-place-popup - opened")
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }
    
  return (
    <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm title="Редактировать профиль" name="profile-edit" isOpened={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <input className="popup__input popup__input_type_name-text" id="profile-name-input" type="text" placeholder="Введите своё имя..." name="name" required minLength="2" maxLength="40" />
			<span className="popup__input-error profile-name-input-error"></span>
            <input className="popup__input popup__input_activity-text" id="activity-input" type="text" placeholder="Введите свою должность..." name="activity" required minLength="2" maxLength="200" />
			<span className="popup__input-error activity-input-error"></span>
            <button className="popup__submit-button" type="submit">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm title="Новое место" name="place-add" isOpened={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <input className="popup__input popup__input_type_place-name-text" id="place-name-input" type="text" placeholder="Название..." name="name" required minLength="2" maxLength="30" />
			<span className="popup__input-error place-name-input-error"></span>
            <input className="popup__input popup__input_image-link-text" id="url-input" type="url" placeholder="Ссылка на картинку..." name="link" required />
			<span className="popup__input-error url-input-error"></span>
            <button className="popup__submit-button add" type="submit">Создать</button>
        </PopupWithForm>
        <PopupWithForm title="Вы уверены?" name="card-delete">
            <button className="popup__submit-button delete" type="submit">Да</button>
        </PopupWithForm>
        <PopupWithForm title="Обновить аватар" name="avatar-edit" isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups}> 
            <input className="popup__input popup__input_type_avatar-link-text" id="avatar-link-input" type="url" placeholder="Ссылка на картинку..." name="avatar" required />
            <span className="popup__input-error avatar-link-input-error"></span>
            <button className="popup__submit-button avatar-edit" type="submit">Сохранить</button>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
