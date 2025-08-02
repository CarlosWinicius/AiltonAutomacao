import React from 'react';

export default function MainSection({
  loading,
  automationLoading,
  disconnectLoading,
  automationResult,
  disconnectResult,
  status,
  showModal,
  error,
  isConnected,
  onGenerateQr,
  onRunAutomation,
  onDisconnect
}) {
  return (
    <section style={{
      flex: '1 1 380px',
      minWidth: 320,
      maxWidth: 520,
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 4px 32px #16A34A11',
      padding: '2.5rem 2.5rem 2rem 2.5rem',
      marginBottom: 32,
      marginTop: 0,
      textAlign: 'center',
      position: 'relative',
      boxSizing: 'border-box',
    }}>
      <h2 style={{ color: '#16A34A', fontWeight: 700, fontSize: 32, marginBottom: 16 }}>Automatize seu atendimento no WhatsApp</h2>
      <p style={{ color: '#222', fontSize: 20, marginBottom: 32, lineHeight: 1.6 }}>
        Gere seu QR Code para conectar o WhatsApp Web e comece a automatizar mensagens, notificações e muito mais. Simples, seguro e eficiente para sua contabilidade!
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
        <button onClick={onGenerateQr} disabled={loading} style={{
          background: '#16A34A',
          color: '#fff',
          fontWeight: 600,
          fontSize: 20,
          padding: '1em 2.5em',
          borderRadius: 10,
          border: 'none',
          boxShadow: '0 2px 12px #16A34A22',
          letterSpacing: 0.5,
          minWidth: 180
        }}>
          {loading ? 'Gerando...' : 'Gerar QR Code'}
        </button>
        <button onClick={onRunAutomation} disabled={automationLoading} style={{
          background: '#2563eb',
          color: '#fff',
          fontWeight: 600,
          fontSize: 20,
          padding: '1em 2.5em',
          borderRadius: 10,
          border: 'none',
          boxShadow: '0 2px 12px #2563eb22',
          letterSpacing: 0.5,
          minWidth: 180
        }}>
          {automationLoading ? 'Executando...' : 'Rodar Automação'}
        </button>
        <button onClick={onDisconnect} disabled={disconnectLoading} style={{
          background: '#dc2626',
          color: '#fff',
          fontWeight: 600,
          fontSize: 20,
          padding: '1em 2.5em',
          borderRadius: 10,
          border: 'none',
          boxShadow: '0 2px 12px #dc262622',
          letterSpacing: 0.5,
          minWidth: 180
        }}>
          {disconnectLoading ? 'Desconectando...' : 'Desconectar'}
        </button>
      </div>
      {automationResult && <p style={{ color: automationResult.includes('sucesso') ? '#16A34A' : 'red', fontWeight: 500 }}>{automationResult}</p>}
      {disconnectResult && <p style={{ color: disconnectResult.includes('sucesso') ? '#16A34A' : 'red', fontWeight: 500 }}>{disconnectResult}</p>}
      {status && !showModal && <p style={{ color: '#16A34A', fontWeight: 'bold', fontSize: 17, marginTop: 8 }}>{status}</p>}
      {error && <p style={{ color: 'red', fontWeight: 500 }}>{error}</p>}
      {isConnected && <p style={{ color: '#2563eb', fontWeight: 600, marginTop: 10 }}>Status: Conectado</p>}
    </section>
  );
}