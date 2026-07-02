import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider';
import AuthProvider from './auth/AuthProvider';
import AuthGate from './auth/AuthGate';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <AuthGate>
          <App />
        </AuthGate>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
