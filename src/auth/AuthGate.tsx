import React, { useState } from 'react';
import { useAuth } from './useAuth';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AdminPage from './AdminPage';

type AuthScreen = 'login' | 'signup' | 'admin';

export default function AuthGate({
  children
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isInitialized } = useAuth();
  const [screen, setScreen] = useState<AuthScreen>('login');

  if (!isInitialized) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: '#666', fontSize: 14 }}>
          Memuat...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (screen === 'signup') {
      return (
        <SignUpPage
          onGoToLogin={() => setScreen('login')}
        />
      );
    }
    return (
      <LoginPage
        onGoToSignUp={() => setScreen('signup')}
        onLoginSuccess={() => setScreen('login')}
      />
    );
  }

  if (screen === 'admin') {
    return (
      <AdminPage onBack={() => setScreen('login')} />
    );
  }

  return (
    <>
      {children}
    </>
  );
}

export function useAuthNavigation() {
  const [screen, setScreen] = useState<AuthScreen>('login');
  return {
    goToAdmin: () => setScreen('admin'),
    goToLogin: () => setScreen('login'),
    currentScreen: screen,
  };
}
