import { RootState } from "@redux/store";

export const selectTitle = (state: RootState) => state.page.title;
export const selectCards = (state: RootState) => state.page.cards;
export const selectSelectedCard = (state: RootState) =>
  state.page.selectedCard;
export const selectIsEditProfileOpen = (state: RootState) =>
  state.page.isEditProfileOpen;
export const selectIsEditAvatarOpen = (state: RootState) =>
  state.page.isEditAvatarOpen;
export const selectIsAddPlaceOpen = (state: RootState) =>
  state.page.isAddPlaceOpen;
export const selectIsInfoTooltipOpen = (state: RootState) =>
  state.page.isInfoTooltipOpen;
export const selectIsCardFullOpen = (state: RootState) =>
  state.page.isCardFullOpen;
