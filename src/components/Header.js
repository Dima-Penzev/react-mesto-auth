import headerLogo from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header root__content">
      <button type="button" className="header__link">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип-надпись место Россия"
        />
      </button>
    </header>
  );
}

export default Header;
