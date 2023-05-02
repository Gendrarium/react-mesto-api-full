import { memo, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderBurgerIcon from "@icons/HeaderBurgerIcon";
import HeaderCloseIcon from "@icons/HeaderCloseIcon";
import LogoIcon from "@icons/LogoIcon";
import { useAppSelector } from "@redux/store";
import { selectCurrentUser, selectLoggedIn } from "@redux/user/selectors";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = memo(({ handleLogout }) => {
  const loggedIn = useAppSelector(selectLoggedIn);
  const location = useLocation();
  const { email } = useAppSelector(selectCurrentUser);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const logout = useCallback(() => {
    setIsOpenInfo(false);
    handleLogout();
  }, [handleLogout]);

  const info = (
    <>
      <p className="header__email">{email}</p>
      <button className="header__button" type="submit" onClick={logout}>
        Выйти
      </button>
    </>
  );

  const handleOpenInfo = useCallback(() => {
    setIsOpenInfo((prev) => !prev);
  }, []);

  return (
    <header className="header page__header">
      {isOpenInfo && <div className="header__block_phone">{info}</div>}
      <div className="header__container">
        <LogoIcon className="header__logo" fill="header__logo-fill" />
        {loggedIn ? (
          <>
            <div className="header__block_desktop">{info}</div>
            <button
              className="header__phone-button"
              type="button"
              onClick={handleOpenInfo}
            >
              {isOpenInfo ? (
                <HeaderCloseIcon
                  className="header__burger-icon"
                  fill="header__burger-fill"
                />
              ) : (
                <HeaderBurgerIcon
                  className="header__burger-icon"
                  stroke="header__burger-stroke"
                />
              )}
            </button>
          </>
        ) : location.pathname === "/sign-up" ? (
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        ) : (
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        )}
      </div>
    </header>
  );
});
export default Header;
