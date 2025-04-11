import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App2 from './App2.jsx';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap App2 with AuthProvider */}
      <BrowserRouter>
        <App2 />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
