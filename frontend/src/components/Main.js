import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile main__profile">
        <div className="profile__container">
          <button className="profile__edit-image" onClick={props.handleEditAvatarClick}>
            <img className="profile__image" src={currentUser.avatar} alt={currentUser.name} />
          </button>
          <div className="profile__name-and-description">
            <div className="profile__name-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={props.handleEditProfileClick}/>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.handleAddPlaceClick}/>
      </section>
      <section className="grid-cards main__grid-cards">
        {props.cards.map((card)=> (
        <Card
          key={card._id}
          card={card}
          onCardLike={props.onCardLike}
          onCardClick={props.onCardClick}
          onCardDelete={props.onCardDelete}
        />))}
      </section>
    </>
  );
}

export default Main;
