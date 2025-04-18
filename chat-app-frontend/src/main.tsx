import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './config/Routes'
import { Toaster } from 'react-hot-toast'
import DarkMode from './components/DarkMode'
import { ChatProvider } from './context/ChatContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <DarkMode />
      <Toaster />
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>

    </BrowserRouter>

  </StrictMode>,
)
