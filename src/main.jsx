import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

try {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
} catch (err) {
  console.error("Fatal render error in main.jsx:", err);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0f172a;color:#f87171;padding:20px;font-family:sans-serif;text-align:center;">
        <h2 style="color:#fff;margin-bottom:8px;">初期化エラー</h2>
        <p style="color:#94a3b8;font-size:13px;max-width:400px;margin-bottom:16px;">アプリの起動中に問題が発生しました。キャッシュを更新してください。</p>
        <pre style="background:#1e293b;padding:12px;border-radius:8px;font-size:11px;color:#fca5a5;max-width:90%;overflow:auto;">${err?.stack || err?.message || String(err)}</pre>
        <button onclick="localStorage.clear();location.reload();" style="margin-top:16px;padding:10px 18px;background:#4f46e5;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">再読み込み</button>
      </div>
    `;
  }
}

