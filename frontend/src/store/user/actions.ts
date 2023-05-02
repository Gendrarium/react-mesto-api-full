import { AppThunk } from "@redux/store";
import { slice } from "./slice";
import { IUser } from "@interfaces/index";

export const { setLoggedIn, setAuthChecking, setCurrentUser } = slice.actions;

export const handleLogin =
  (user: IUser): AppThunk =>
  (dispatch) => {
    dispatch(setLoggedIn(true));
    dispatch(setCurrentUser(user));
  };

export const checkToken = (): AppThunk => (dispatch, getState, auth) => {
  dispatch(setAuthChecking(true));

  auth
    .checkToken()
    .then((res) => {
      if (res.email) {
        dispatch(handleLogin(res));
      }
    })
    .finally(() => {
      dispatch(setAuthChecking(false));
    });
};