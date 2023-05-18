import headerLogo from "../images/header-logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Header({
  btnState,
  userEmail,
  loggedIn,
  resetStates,
  toggleBtnState,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function signOut() {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    resetStates();
  }

  // function renderBtn() {
  //   if (btnState) {
  //     return (
  //       <Link className="header__entry" to="/signup" onClick={toggleBtnState}>
  //         Регистрация
  //       </Link>
  //     );
  //   } else if (loggedIn) {
  //     return (
  //       <button
  //         className={`header__menu ${isMenuOpen ? "header__menu_close" : ""}`}
  //         type="button"
  //         aria-label="меню"
  //         onClick={toggleBtnMenu}
  //       />
  //     );
  //   } else {
  //     return (
  //       <Link className="header__entry" to="/signin" onClick={toggleBtnState}>
  //         Войти
  //       </Link>
  //     );
  //   }
  // }

  function toggleBtnMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header root__content">
      {loggedIn && (
        <nav
          className={`header__navigation ${
            isMenuOpen ? "header__navigation_opened" : ""
          }`}
        >
          {loggedIn && <p className="header__user-email">{userEmail}</p>}
          <Link className="header__entry" onClick={signOut}>
            Выйти
          </Link>
        </nav>
      )}
      <div className="header__container">
        <button type="button" className="header__link">
          <img
            className="header__logo"
            src={headerLogo}
            alt="Логотип-надпись место Россия"
          />
        </button>
        {location.pathname === "/signin" && (
          <Link className="header__entry" to="/signup">
            Регистрация
          </Link>
        )}
        {location.pathname === "/signup" && (
          <Link className="header__entry" to="/signin">
            Войти
          </Link>
        )}
        {/* {renderBtn()} */}
      </div>
    </header>
  );
}

export default Header;
