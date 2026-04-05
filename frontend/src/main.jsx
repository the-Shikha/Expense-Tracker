import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast'; 
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Toaster 
          position="top-right" 
          reverseOrder={false} 
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700',
            duration: 3000,
          }}
        />
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);