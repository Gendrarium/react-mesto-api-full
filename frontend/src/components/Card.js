import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__del ${!isOwn && 'card__del_display-none'}`
  );
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_fill'}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card, isLiked);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card" >
      <div className="card__image-container">
        <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      </div>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}/>
      <div className="card__bottom-container">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
          <p className="card__like-num">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;
