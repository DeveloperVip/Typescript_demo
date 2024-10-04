import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { APIContextProvider } from './contexts/ContextAPI.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIContextProvider>
      <App />
    </APIContextProvider>
    
  </StrictMode>,
)
