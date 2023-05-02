import { ICard } from "@interfaces/index";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectCurrentUser } from "@redux/user/selectors";
import { handleCardClick } from "@redux/page/actions";
import CardsDelIcon from "@icons/CardsDelIcon";
import CardsLikeIcon from "@icons/CardsLikeIcon";
import CardsLikeFillIcon from "@icons/CardsLikeFillIcon";

interface CardProps {
  card: ICard;
  onCardLike: (c: ICard, iL: boolean) => void;
  onCardDelete: (c: ICard) => void;
}

const Card: React.FC<CardProps> = ({ card, onCardLike, onCardDelete }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const isLiked = card.likes.some((i) => i === currentUser._id);

  function handleClick() {
    dispatch(handleCardClick(card));
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleDeleteClick() {
    if (card.owner._id === currentUser._id) {
      onCardDelete(card);
    }
  }

  return (
    <article className="card">
      <div className="card__image-container">
        <img
          className="card__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      {card.owner._id === currentUser._id && (
        <button className="card__del" type="button" onClick={handleDeleteClick}>
          <CardsDelIcon className="card__del-icon" fill="card__del-icon-fill" />
        </button>
      )}
      <div className="card__bottom-container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className="card__like"
            type="button"
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <CardsLikeFillIcon
                className="card__like-icon"
                fill="card__like-icon-fill"
              />
            ) : (
              <CardsLikeIcon
                className="card__like-icon"
                fill="card__like-icon-fill"
              />
            )}
          </button>
          <span className="card__like-num">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
};
export default Card;
