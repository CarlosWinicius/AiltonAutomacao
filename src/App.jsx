import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import QRModal from './components/QRModal'
import MainSection from './components/MainSection'
import BenefitsSection from './components/BenefitsSection'
import HowItWorksSection from './components/HowItWorksSection'
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
      const instance = import.meta.env.VITE_INSTANCE_ID;
      const apiUrl = `https://evolutionapi.atendai.tech/instance/connect/${instance}`;
      const response = await axios.get(
        apiUrl,
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
      const instance = import.meta.env.VITE_INSTANCE_ID;
      const apiUrl = `https://evolutionapi.atendai.tech/instance/connect/${instance}`;
      const response = await axios.get(
        apiUrl,
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
      const response = await axios.get(webhookUrl);
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
      const instance = import.meta.env.VITE_INSTANCE_ID;
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://evolutionapi.atendai.tech/instance/logout/${instance}`;
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
        <MainSection
          loading={loading}
          automationLoading={automationLoading}
          disconnectLoading={disconnectLoading}
          automationResult={automationResult}
          disconnectResult={disconnectResult}
          status={status}
          showModal={showModal}
          error={error}
          isConnected={isConnected}
          onGenerateQr={handleGenerateQr}
          onRunAutomation={handleRunAutomation}
          onDisconnect={handleDisconnect}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 380, gap: 32, boxSizing: 'border-box' }}>
          <BenefitsSection />
          <HowItWorksSection />
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
