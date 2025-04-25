import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CertificateOfRegistration from './CertificateOfRegistration.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CertificateOfRegistration />
  </StrictMode>,
)
