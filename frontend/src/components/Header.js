import logo from '../images/header-logo.svg';
import React from 'react';
import {Link} from 'react-router-dom';
import phoneButton from '../images/header-phone-button.svg'
import phoneCloseButton from '../images/header-phone-close-button.svg'

function Header({loggedIn, location, email, handleLogout}) {
  const [isOpenInfo, setIsOpenInfo] = React.useState(false);
  const info = (<>
    <p className="header__email">{email}</p>
    <button className="header__button" type="submit" onClick={logout}>Выйти</button>
  </>)

  function handleOpenInfo() {
    setIsOpenInfo(!isOpenInfo);
  }

  function logout() {
    setIsOpenInfo(false);
    handleLogout();
  }

  return (
    <header className="header page__header">
      {isOpenInfo && <div className="header__block_phone">
        {info}
      </div>}
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип Место"/>
        {loggedIn ? (<>
        <div className="header__block_desktop">{info}</div>
        <button
          className="header__phone-button"
          type="button"
          onClick={handleOpenInfo}
          style={{backgroundImage: `url(${isOpenInfo ? phoneCloseButton : phoneButton})`}}
        />
        </>) :
        location === "/sign-up" ?
        <Link className="header__link" to="/sign-in">Войти</Link> :
        <Link className="header__link" to="/sign-up">Регистрация</Link>}
      </div>
    </header>
  );
}
export default Header;
