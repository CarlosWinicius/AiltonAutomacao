import React from 'react';

export default function DebugPanel({ debug }) {
  if (!debug) return null;
  return (
    <pre style={{ marginTop: 24, background: '#222', color: '#fff', padding: 16, borderRadius: 8, fontSize: 13, maxWidth: 600, overflowX: 'auto' }}>{debug}</pre>
  );
}