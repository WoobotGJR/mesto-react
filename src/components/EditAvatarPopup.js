import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const inputRef = React.createRef()

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateAvatar({
          newAvatar: inputRef.current.value,
        });

        inputRef.current.value = null;
      }

    return (
        <PopupWithForm title="Обновить аватар" name="avatar-edit" buttonText="Сохранить" isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} > 
            <input className="popup__input popup__input_type_avatar-link-text" ref={inputRef} id="avatar-link-input" type="url" placeholder="Ссылка на картинку..." name="avatar" required />
            <span className="popup__input-error avatar-link-input-error"></span>
        </PopupWithForm>
    )
}