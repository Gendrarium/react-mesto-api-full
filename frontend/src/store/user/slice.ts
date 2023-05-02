import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "@interfaces/index";

export interface IStateUser {
  loggedIn: boolean;
  authChecking: boolean;
  currentUser: IUser;
}

const initialState: IStateUser = {
  loggedIn: false,
  authChecking: true,
  currentUser: {
    name: "",
    email: "",
    _id: "",
    avatar: "",
    about: "",
  },
};

// create a slice
export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setAuthChecking: (state, action: PayloadAction<boolean>) => {
      state.authChecking = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
  },
});

export default slice.reducer;
