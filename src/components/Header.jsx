import React from 'react';
import logoSvg from '../assets/logo.svg';
import logoPng from '../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <header className="header-root">
      <div className="header-logo-block">
        <picture>
          <source srcSet={logoSvg} type="image/svg+xml" />
          <img src={logoPng} alt="Logo Ailton Automação" className="header-logo-img" />
        </picture>
        <span className="header-title">atendai.tech</span>
      </div>
      <div className="header-right-block">
        <h1 className="header-company">Ailton Automação</h1>
        <span className="header-desc">Soluções inteligentes para o seu negócio</span>
      </div>
    </header>
  );
}
// ... existing code ...