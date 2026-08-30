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
          <a href="#sobre" onClick={closeMenu}>
            Sobre
          </a>

          <a href="#como-ajudar" onClick={closeMenu}>
            Como ajudar
          </a>

          <a href="#publicacoes" onClick={closeMenu}>
            Publicações
          </a>

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
