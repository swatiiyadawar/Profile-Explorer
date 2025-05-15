import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminProvider } from './context-api/admincontext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </AdminProvider>
  </StrictMode>,
)
