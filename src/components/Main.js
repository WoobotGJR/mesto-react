import React from "react";
import api from "../utils/api.js"
import Card from "./Card.js";

function Main(props) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([])
    // const [userId, setUserId] = React.useState("")

    React.useEffect(() => {
        api.getInitialCards()
            .then(initialCards => {
                setCards([...initialCards]);
            })
            .catch(error => {
                console.log(`Initial cards loading error - ${error}`)
            })
    }, [])

    React.useEffect(() => {
        api.getUserInfo()
            .then(userInitialInfo => {
                setUserAvatar(userInitialInfo.avatar);
                setUserDescription(userInitialInfo.about);
                setUserName(userInitialInfo.name);
                // setUserId(userInitialInfo._id);
            })
            .catch(err => {
                console.log(`Initial info loading error - ${err}`);
            })
    }, [])

    return (
        <main className="main">
                <section className="profile">
                    <div className="profile__avatar-container"> 
                        <img className="profile__avatar" src={userAvatar} alt="Фото профиля"/>
                        <button className="profile__avatar-overlay" type="button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__info-grid">
                        <h1 className="profile__name">{userName}</h1>
                        <p className="profile__activity">{userDescription}</p>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
                </section>
                <section className="elements">
                    {cards.map(card => {
                        return (<Card card={card} onCardClick={props.onCardClick} key={card._id}/>)
                    })}
                </section>
        </main>
    );
}

export default Main;