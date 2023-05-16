import headerLogo from "../images/header-logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Header({ btnState, userEmail, loggedIn, resetStates }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    resetStates();
  }

  function renderBtn() {
    if (btnState) {
      return (
        <Link className="header__entry" to="/signin">
          Войти
        </Link>
      );
    } else if (loggedIn) {
      return (
        <button className="header__entry" onClick={signOut}>
          Выйти
        </button>
      );
    } else {
      return (
        <Link className="header__entry" to="/signup">
          Регистрация
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
