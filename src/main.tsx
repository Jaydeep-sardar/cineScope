import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { QueryProvider } from './components/providers/query-provider';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
