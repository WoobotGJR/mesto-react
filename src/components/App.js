import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({
        avatar: null,
        about: null,
        name: null,
    });

    React.useEffect(() => {
        api.getUserInfo()
            .then(userInfo => {
                setCurrentUser(userInfo);
            })
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then(initialCards => {
                setCards([...initialCards]);
            })
            .catch(error => {
                console.log(`Initial cards loading error - ${error}`)
            })
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c)); // Необходимо дополнительно разобраться с конструкцией коллбэков 
            })
            .catch(err => {
                console.log(`card like toggle error - ${err}`)
            })
        
    }

    function handleCardDelete(card) {
        api.deleteUserCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id)) // Если взять выражение после второй стрелочной функции в скобки, то произойдёт ошибка 
            })                                                               // Expected an assignment or function call and instead saw an expression
            .catch(err => {
                console.log(`card delete error - ${err}`)
            })
    }

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
    
    function handleUpdateUser({newName, newDescription}) {
        api.setUserInfo({username: newName, userInfo: newDescription})
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(error => {
                console.log(`new info setting error - ${error}`);
            })
    }

    function handleUpdateAvatar({newAvatar}) {
        api.setUserAvatar({avatar: newAvatar})
            .then(res => {
                setCurrentUser(res)
                closeAllPopups();
            })
            .catch(error => {
                console.log(`new avatar setting error - ${error}`);
            })
    }

    function handleAddPlaceSubmit({link, placeName}) {
        api.addUserCard({link: link, name: placeName})
            .then(res => {
                setCards([res, ...cards])
            })
            .catch(error => {
                console.log(`new card setting error - ${error}`);
            })
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
            cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
            />
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} handleSubmit={handleAddPlaceSubmit} />
            <PopupWithForm title="Вы уверены?" name="card-delete" buttonText="Да" />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
