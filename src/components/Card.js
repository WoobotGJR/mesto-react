import React from "react";
import api from "../utils/api.js";

function Cards(props) {
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getInitialCards()
            .then(initialCards => {
                setCards([...initialCards]);
            })
            .catch(error => {
                console.log(`Initial cards loading error - ${error}`)
            })
    }, [])

    // function handleClick(card) {
    //     props.onCardClick(card);
    //   } 

    return (  
        cards.map((card) => {
            return (
                <div id="card-element" key={card._id}>
                            <article className="element">
                                <button className="element__delete-button"></button>
                                <img className="element__image" src={card.link} alt="Изображение места" onClick={() => {props.onCardClick(card)}} />
                                <div className="element__bottom-panel"> 
                                    <h2 className="element__subtitle">{card.name}</h2>
                                    <div className="element__like-container">
                                        <button className="element__like-button" type="button"></button>
                                        <div className="element__like-counter"></div>
                                    </div>
                                </div>
                            </article>
                    </div>
            )
        })
    )
}

// class Cards extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             cards: []
//         }
//     }

//     componentDidMount() {
//         api.getInitialCards()
//             .then(initialCards => {
//                 this.state.cards = [...initialCards];
//             })
//             .catch(error => {
//                 console.log(`Initial cards loading error - ${error}`)
//             })
//     }

//     render() {
//         return (
//             this.state.cards.map((card) => {
//                 return (
//                     <div id="card-element" key={card._id}>
//                         <article className="element">
//                             <button className="element__delete-button"></button>
//                             <img className="element__image" src={card.link} alt="Изображение места" />
//                             <div className="element__bottom-panel">
//                                 <h2 className="element__subtitle">{card.name}</h2>
//                                 <div className="element__like-container">
//                                     <button className="element__like-button" type="button"></button>
//                                     <div className="element__like-counter"></div>
//                                 </div>
//                             </div>
//                         </article>
//                 </div>
//                 )
//             })
//         );
//     }
// }

export default Cards;