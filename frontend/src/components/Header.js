import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, userEmail }) {
  const location = useLocation();

  const renderLoginControl = () => {
    if (location.pathname === '/sign-up') {
      return <Link to='/sign-in' className="header__sing-link">Войти</Link>;
    } else if (location.pathname === '/sign-in') {
      return <Link to='/sign-up' className="header__sing-link">Регистрация</Link>;
    } else if (loggedIn) {
      return (
          <div className="header__auth-container">
            <p className="header__email">{userEmail}</p>
            <Link to='/sign-in' className="header__sing-link header__sing-link_logout">Выйти</Link>
          </div>
      );
    }
  };

  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      {renderLoginControl()}
    </header>

  );
}

export default Header;
