import React from 'react';
import logoSvg from '../assets/logo.svg';
import logoPng from '../assets/logo.png';

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
      marginTop: 32
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <picture>
          <source srcSet={logoSvg} type="image/svg+xml" />
          <img src={logoPng} alt="Logo" style={{ width: 88, height: 88, filter: 'drop-shadow(0 0 12px #16A34A33)' }} />
        </picture>
        <span style={{ fontWeight: 900, fontSize: '2.2rem', color: '#16A34A', letterSpacing: 1, fontFamily: 'inherit' }}>atendai.tech</span>
      </div>
      <h1 style={{ fontWeight: 800, fontSize: '2.6rem', letterSpacing: 1, color: '#16A34A', margin: 0, marginTop: 8 }}>Automação</h1>
      <span style={{ color: '#444', fontSize: 18, marginTop: 6, fontWeight: 400, letterSpacing: 0.5 }}>Conecte seu WhatsApp ao futuro da contabilidade</span>
    </header>
  );
}