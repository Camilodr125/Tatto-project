import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser'
import './index.css'
import App from './App.jsx'
import { readEmailJsEnv } from './utils/emailjsEnv'

const { publicKey } = readEmailJsEnv(import.meta.env)
if (publicKey) {
  emailjs.init({ publicKey })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
