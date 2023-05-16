import headerLogo from "../images/header-logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Header({ userEmail, loggedIn }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
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
      {userEmail ? (
        <button className="header__entry" onClick={signOut}>
          Выйти
        </button>
      ) : (
        <Link className="header__entry" to="/signup">
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;
