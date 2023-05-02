import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ICard } from "@interfaces/index";

export interface IStatePage {
  title: string;
  cards: ICard[];
  selectedCard: ICard;
  isEditProfileOpen: boolean;
  isAddPlaceOpen: boolean;
  isEditAvatarOpen: boolean;
  isInfoTooltipOpen: boolean;
  isCardFullOpen: boolean;
}

const initialState: IStatePage = {
  title: "Mesto",
  cards: [],
  selectedCard: {
    _id: "",
    name: "",
    likes: [],
    link: "",
    owner: {
      name: "",
      email: "",
      _id: "",
      avatar: "",
      about: "",
    },
    createdAt: "",
  },
  isEditProfileOpen: false,
  isEditAvatarOpen: false,
  isAddPlaceOpen: false,
  isInfoTooltipOpen: false,
  isCardFullOpen: false,
};

// create a slice
export const slice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
    setSelectedCard: (state, action: PayloadAction<ICard>) => {
      state.selectedCard = action.payload;
    },
    setIsEditProfileOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditProfileOpen = action.payload;
    },
    reverseIsEditProfileOpen: (state) => {
      state.isEditProfileOpen = !state.isEditProfileOpen;
    },
    setIsEditAvatarOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditAvatarOpen = action.payload;
    },
    reverseIsEditAvatarOpen: (state) => {
      state.isEditAvatarOpen = !state.isEditAvatarOpen;
    },
    setIsAddPlaceOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddPlaceOpen = action.payload;
    },
    reverseIsAddPlaceOpen: (state) => {
      state.isAddPlaceOpen = !state.isAddPlaceOpen;
    },
    setIsInfoTooltipOpen: (state, action: PayloadAction<boolean>) => {
      state.isInfoTooltipOpen = action.payload;
    },
    setIsCardFullOpen: (state, action: PayloadAction<boolean>) => {
      state.isCardFullOpen = action.payload;
    },
    closeAllPopups: (state) => {
      state.isEditProfileOpen = false;
      state.isAddPlaceOpen = false;
      state.isEditAvatarOpen = false;
      state.isInfoTooltipOpen = false;
      state.isCardFullOpen = false;
    },
  },
});

export default slice.reducer;
