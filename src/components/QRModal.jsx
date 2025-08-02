import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRModal({ open, qrImg, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#111',
        padding: 32,
        borderRadius: 12,
        boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
        position: 'relative',
        minWidth: 340,
        textAlign: 'center',
        maxWidth: '90vw'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: 24,
          cursor: 'pointer',
          fontWeight: 'bold',
          zIndex: 2
        }}>×</button>
        <div style={{ color: '#fff', marginBottom: 16, fontSize: 18, fontWeight: 500, marginTop: 24 }}>
          Escaneie o QR code com seu WhatsApp Web
        </div>
        <div style={{ background: 'white', padding: 16, borderRadius: 8, display: 'inline-block' }}>
          {qrImg ? (
            <img src={qrImg} alt="QR Code" style={{ width: 256, height: 256, display: 'block' }} />
          ) : (
            <QRCodeSVG value={import.meta.env.VITE_WHATSAPP_QR_VALUE || 'https://wa.me/SEUNUMERO'} size={256} />
          )}
        </div>
      </div>
    </div>
  );
}