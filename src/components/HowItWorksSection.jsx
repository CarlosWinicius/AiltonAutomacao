import React from 'react';

export default function HowItWorksSection() {
  return (
    <section style={{
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 2px 12px #16A34A08',
      padding: '1.5rem 2.5rem 1.5rem 2.5rem',
      textAlign: 'center',
      boxSizing: 'border-box',
    }}>
      <h3 style={{ color: '#16A34A', fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Como funciona?</h3>
      <ol style={{ color: '#222', fontSize: 17, textAlign: 'left', margin: '0 auto', maxWidth: 520, paddingLeft: 20, lineHeight: 1.7 }}>
        <li>Clique em "Gerar QR Code"</li>
        <li>Escaneie com o WhatsApp Web</li>
        <li>Pronto! Seu atendimento automatizado está ativo</li>
      </ol>
    </section>
  );
}