import React from 'react';

export default function BenefitsSection() {
  return (
    <section style={{
      background: '#f6f6f6',
      borderRadius: 18,
      boxShadow: '0 2px 12px #16A34A08',
      padding: '2rem 2.5rem 1.5rem 2.5rem',
      textAlign: 'center',
      boxSizing: 'border-box',
    }}>
      <h3 style={{ color: '#16A34A', fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Por que automatizar?</h3>
      <ul style={{ color: '#222', fontSize: 17, textAlign: 'left', margin: '0 auto', maxWidth: 520, paddingLeft: 20, lineHeight: 1.7 }}>
        <li>Respostas automáticas para clientes 24h</li>
        <li>Envio de lembretes e notificações</li>
        <li>Agilidade no atendimento e menos erros</li>
        <li>Mais tempo para focar no que importa</li>
      </ul>
    </section>
  );
}