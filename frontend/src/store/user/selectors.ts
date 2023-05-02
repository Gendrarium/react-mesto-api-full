import { RootState } from "@redux/store";

export const selectLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectAuthChecking = (state: RootState) => state.user.authChecking;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
