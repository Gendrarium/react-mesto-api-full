import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PopupWithForm from "../Popups/PopupWithForm";
import EditProfilePopup from "../Popups/EditProfile/EditProfilePopup";
import EditAvatarPopup from "../Popups/EditAvatar/EditAvatarPopup";
import AddPlacePopup from "../Popups/AddPlace/AddPlacePopup";
import ImagePopup from "../Popups/ImagePopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import api from "@utils/api";
import { logout } from "@utils/auth";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { checkToken, setCurrentUser, setLoggedIn } from "@redux/user/actions";
import { selectCurrentUser, selectLoggedIn } from "@redux/user/selectors";
import {
  addCard,
  closeAllPopups,
  setIsInfoTooltipOpen,
} from "@redux/page/actions";

function App() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const loggedIn = useAppSelector(selectLoggedIn);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInfoTooltip = useCallback(
    (isOkey: boolean) => {
      if (isOkey) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      dispatch(setIsInfoTooltipOpen(true));
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    logout().then((res) => {
      if (res) {
        dispatch(setLoggedIn(false));
        navigate("/sign-in");
      }
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname, navigate]);

  const handleUpdateUser = useCallback(
    (data: { name: string; about: string }) => {
      api
        .editUserInfo(data)
        .then((userData) => {
          dispatch(setCurrentUser(userData));
          dispatch(closeAllPopups());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  const handleUpdateAvatar = useCallback(
    (data: { avatar: string }) => {
      api
        .editAvatar(data)
        .then((userData) => {
          dispatch(setCurrentUser(userData));
          dispatch(closeAllPopups());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  const handleAddPlaceSubmit = useCallback(
    (data: { name: string; link: string }) => {
      api
        .addCard(data)
        .then((newCard) => {
          const newCardWithOwner = { ...newCard, owner: currentUser };
          dispatch(addCard(newCardWithOwner));
          dispatch(closeAllPopups());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [currentUser, dispatch]
  );

  return (
    <>
      <Header handleLogout={handleLogout} />
      <main className="main">
        <Routes>
          <Route
            path="/sign-up"
            element={<Register openNotice={handleInfoTooltip} />}
          />
          <Route
            path="/sign-in"
            element={<Login openNotice={handleInfoTooltip} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      {loggedIn && (
        <>
          <EditProfilePopup onUpdateUser={handleUpdateUser} />
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} />
          <PopupWithForm title="Вы уверены?" buttonCaption="Да" />
          <ImagePopup />
        </>
      )}
      <InfoTooltip
        isSuccess={isSuccess}
        onClose={dispatch.bind(null, closeAllPopups())}
      />
    </>
  );
}

export default App;
