import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from 'toastini'
import '../../src/styles/styles.css'
import 'toastini/dist/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)
