import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import QRModal from './components/QRModal'
import './App.css'

function App() {
  const [qrImg, setQrImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [automationLoading, setAutomationLoading] = useState(false);
  const [disconnectLoading, setDisconnectLoading] = useState(false);
  const [automationResult, setAutomationResult] = useState('');
  const [disconnectResult, setDisconnectResult] = useState('');

  const handleGenerateQr = async () => {
    setLoading(true);
    setError('');
    setQrImg('');
    setStatus('');
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL,
        {
          headers: {
            apikey: import.meta.env.VITE_API_KEY
          }
        }
      );
      if (response.data.base64) {
        setQrImg(response.data.base64);
        setShowModal(true);
        setStatus('Aguardando conexão com o WhatsApp. Escaneie o QR Code.');
      } else {
        setQrImg('');
        setShowModal(false);
        setStatus('Nenhum QR Code disponível. Estado: ' + (response.data.state || 'desconhecido'));
      }
    } catch (err) {
      setError('Erro ao gerar QR Code.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    setStatus('');
    setQrImg('');
    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL,
        {
          headers: {
            apikey: import.meta.env.VITE_API_KEY
          }
        }
      );
      if (response.data.base64) {
        setStatus('Aguardando conexão com o WhatsApp. Escaneie o QR Code.');
      } else {
        setStatus('Nenhum QR Code disponível. Estado: ' + (response.data.state || 'desconhecido'));
      }
    } catch (err) {
      setError('Erro ao consultar status.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunAutomation = async () => {
    setAutomationLoading(true);
    setAutomationResult('');
    try {
      const webhookUrl = import.meta.env.VITE_AUTOMATION_WEBHOOK;
      const response = await axios.post(webhookUrl);
      setAutomationResult('Automação executada com sucesso!');
    } catch (err) {
      setAutomationResult('Erro ao executar automação.');
    } finally {
      setAutomationLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setDisconnectLoading(true);
    setDisconnectResult('');
    try {
      const serverUrl = import.meta.env.VITE_API_URL.replace(/\/$/, '');
      const instance = import.meta.env.VITE_INSTANCE_ID || '';
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `${serverUrl}/instance/delete/${instance}`;
      await axios.delete(url, { headers: { apikey: apiKey } });
      setDisconnectResult('Desconectado com sucesso!');
    } catch (err) {
      setDisconnectResult('Erro ao desconectar.');
    } finally {
      setDisconnectLoading(false);
    }
  };

  // Estado "conectado" se status desconhecido ou erro ao gerar QR Code
  const isConnected = (!status || status.toLowerCase().includes('desconhecido')) && !error;

  return (
    <div className="container flex-layout" style={{ minHeight: '100vh', background: '#fafbfc', padding: 0, width: '100vw', overflowX: 'hidden' }}>
      <Header />
      <div className="main-flex" style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1400px', margin: '0 auto', width: '100%', flexWrap: 'wrap', boxSizing: 'border-box' }}>
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
            <button onClick={handleGenerateQr} disabled={loading} style={{
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
            <button onClick={handleRunAutomation} disabled={automationLoading} style={{
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
            <button onClick={handleDisconnect} disabled={disconnectLoading} style={{
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
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 380, gap: 32, boxSizing: 'border-box' }}>
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
        </div>
      </div>
      <footer style={{ textAlign: 'center', color: '#888', fontSize: 15, marginTop: 32, marginBottom: 16 }}>
        &copy; {new Date().getFullYear()} Ailton Automação. Todos os direitos reservados.
      </footer>
      <QRModal open={showModal} qrImg={qrImg} onClose={handleCloseModal} />
    </div>
  );
}

export default App
