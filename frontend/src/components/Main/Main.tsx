import { useCallback, useEffect } from "react";

import type { ICard } from "@interfaces/index";

import Card from "../Card/Card";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectCurrentUser, selectLoggedIn } from "@redux/user/selectors";
import { selectCards } from "@redux/page/selectors";
import {
  changeCardsWithCallback,
  reverseIsAddPlaceOpen,
  reverseIsEditAvatarOpen,
  reverseIsEditProfileOpen,
  setCards,
} from "@redux/page/actions";
import api from "@utils/api";
import ProfileEditIcon from "@icons/ProfileEditIcon";
import PlusIcon from "@icons/PlusIcon";

const Main: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const loggedIn = useAppSelector(selectLoggedIn);
  const cards = useAppSelector(selectCards);
  const dispatch = useAppDispatch();

  const handleEditProfileClick = useCallback(() => {
    dispatch(reverseIsEditProfileOpen());
  }, [dispatch]);

  const handleAddPlaceClick = useCallback(() => {
    dispatch(reverseIsAddPlaceOpen());
  }, [dispatch]);

  const handleEditAvatarClick = useCallback(() => {
    dispatch(reverseIsEditAvatarOpen());
  }, [dispatch]);

  const handleCardLike = useCallback(
    (card: ICard, isLiked: boolean) => {
      const likeOrDis = !isLiked
        ? api.likeCard(card._id)
        : api.dislikeCard(card._id);
      likeOrDis
        .then((newCard: ICard) => {
          dispatch(
            changeCardsWithCallback((cardsState: ICard[]) =>
              cardsState.map((c) => (c._id === card._id ? newCard : c))
            )
          );
        })
        .catch((err: Error) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  const handleCardDelete = useCallback(
    (card: ICard) => {
      api
        .deleteCard(card._id)
        .then(() => {
          dispatch(
            changeCardsWithCallback((cardsState: ICard[]) =>
              cardsState.filter((c) => !(c._id === card._id))
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((gridCards) => {
          dispatch(setCards(gridCards.reverse()));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, dispatch]);

  return (
    <>
      <section className="profile main__no-margin">
        <div className="profile__container">
          <button
            className="profile__edit-image"
            onClick={handleEditAvatarClick}
          >
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
            <ProfileEditIcon
              className="profile__edit-icon profile__edit-icon_absolute"
              fill="profile__edit-fill"
            />
          </button>
          <div className="profile__name-and-description">
            <div className="profile__name-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={handleEditProfileClick}
              >
                <ProfileEditIcon
                  className="profile__edit-icon"
                  fill="profile__edit-fill"
                />
              </button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={handleAddPlaceClick}
        >
          <PlusIcon
            className="profile__add-icon"
            fill="profile__add-icon-fill"
          />
        </button>
      </section>
      <section className="grid-cards main__grid-cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </>
  );
};

export default Main;
