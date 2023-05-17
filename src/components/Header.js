import headerLogo from "../images/header-logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Header({
  btnState,
  userEmail,
  loggedIn,
  resetStates,
  toggleBtnState,
}) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    resetStates();
  }

  function renderBtn() {
    if (btnState) {
      return (
        <Link className="header__entry" to="/signup" onClick={toggleBtnState}>
          Регистрация
        </Link>
      );
    } else if (loggedIn) {
      return (
        <Link className="header__entry" onClick={signOut}>
          Выйти
        </Link>
      );
    } else {
      return (
        <Link className="header__entry" to="/signin" onClick={toggleBtnState}>
          Войти
        </Link>
      );
    }
  }
  return (
    <header className="header root__content">
      <button type="button" className="header__link">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип-надпись место Россия"
        />
      </button>
      {loggedIn && <p className="header__user-email">{userEmail}</p>}
      <>{renderBtn()}</>
    </header>
  );
}

export default Header;
