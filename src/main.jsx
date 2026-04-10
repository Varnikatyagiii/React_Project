import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Website from './website.jsx'
import Websitee from './websitee.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Websitee/>
    
  </StrictMode>,
)
