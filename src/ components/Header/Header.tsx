import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="site-header__nav" aria-label="Navegação principal">
        <Link className="site-header__logo-link" to="/" onClick={closeMenu}>
          <img src={logo} alt="Vozes das Ruas" className="site-header__logo" />
        </Link>

        <button
          type="button"
          className="site-header__menu-button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`site-header__links ${
            isMenuOpen ? "site-header__links--open" : ""
          }`}
        >
          <Link to="/sobre" onClick={closeMenu}>
            Sobre
          </Link>

          <Link to="/#como-ajudar" onClick={closeMenu}>
            Como ajudar
          </Link>

          <Link to="/publicacoes" onClick={closeMenu}>
            Publicações
          </Link>

          <a
            href="https://www.instagram.com/vozesdasruasm/"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Instagram
          </a>
        </div>
      </nav>
    </header>
  );
}
