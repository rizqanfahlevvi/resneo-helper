import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider';
import AuthProvider from './auth/AuthProvider';
import AuthGate from './auth/AuthGate';
import PwaUpdatePrompt from './components/PwaUpdatePrompt';
import ErrorBoundary from './components/ErrorBoundary';
import { installGlobalErrorHandlers } from './utils/errorLog';

installGlobalErrorHandlers();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <AuthGate>
            <App />
          </AuthGate>
          <PwaUpdatePrompt />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
