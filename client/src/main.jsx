import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/inter';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider.jsx';
import SpotProvider from './context/SpotProvider.jsx';
import DrawerProvider from './context/DrawerProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SpotProvider>
          <DrawerProvider>
            <App />
          </DrawerProvider>
        </SpotProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
