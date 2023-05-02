import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import pageReducer from "./page/slice";
import * as auth from "@utils/auth";

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: auth,
      },
    }),
});

//reduxTypes
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  typeof auth,
  Action<string>
>;

// export type AppThunkAsync<ReturnType = void> = ThunkAction<
//   Promise<ReturnType>,
//   RootState,
//   undefined,
//   Action<string>
// >;

//reduxHelpers
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
