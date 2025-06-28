import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/inter';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider.jsx';
import SpotProvider from './context/SpotProvider.jsx';
import DrawerProvider from './context/DrawerProvider.jsx';
import AccRequestProvider from './context/AccRequestProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SpotProvider>
            <AccRequestProvider>
              <DrawerProvider>
                <App />
              </DrawerProvider>
            </AccRequestProvider>
        </SpotProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
