import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState(null);
    const [link, setLink] = React.useState(null);

    function handlePlaceNameInput(event) {
        setPlaceName(event.target.value);
        // console.log(placeName);
    }

    function handleLinkInput(event) {
        setLink(event.target.value);
        // console.log(link);
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.handleSubmit({link: link, placeName: placeName});

        props.onClose() // Модальное окно может закрываться при удачном сабмите, если использовать .finally в api запросе
    }

    return (
        <PopupWithForm title="Новое место" name="place-add" buttonText="Создать" isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_place-name-text" onChange={handlePlaceNameInput} id="place-name-input" type="text" placeholder="Название..." name="name" required minLength="2" maxLength="30" />
            <span className="popup__input-error place-name-input-error"></span>
            <input className="popup__input popup__input_image-link-text" onChange={handleLinkInput} id="url-input" type="url" placeholder="Ссылка на картинку..." name="link" required />
            <span className="popup__input-error url-input-error"></span>
        </PopupWithForm>
    )
}