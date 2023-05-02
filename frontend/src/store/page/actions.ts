import { AppThunk } from "@redux/store";
import { slice } from "./slice";
import { ICard } from "@interfaces/index";

export const {
  setTitle,
  setCards,
  setSelectedCard,
  setIsEditAvatarOpen,
  reverseIsAddPlaceOpen,
  reverseIsEditAvatarOpen,
  reverseIsEditProfileOpen,
  setIsEditProfileOpen,
  setIsAddPlaceOpen,
  setIsInfoTooltipOpen,
  setIsCardFullOpen,
  closeAllPopups,
} = slice.actions;

// thunks
export const addCard =
  (newCard: ICard): AppThunk =>
  (dispatch, getState) => {
    const cards = getState().page.cards;

    dispatch(setCards([newCard, ...cards]));
  };

export const handleCardClick =
  (card: ICard): AppThunk =>
  (dispatch) => {
    dispatch(setSelectedCard(card));
    dispatch(setIsCardFullOpen(true));
  };

export const changeCardsWithCallback =
  (callback: (c: ICard[]) => ICard[]): AppThunk =>
  (dispatch, getState) => {
    const cards = getState().page.cards;

    dispatch(setCards(callback(cards)));
  };
