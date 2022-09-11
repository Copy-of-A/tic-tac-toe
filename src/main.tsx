import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter basename={import.meta.env.VITE_APP_BASE_PATH as string}>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
