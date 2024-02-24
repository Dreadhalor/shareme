import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'dread-ui';
import 'dread-ui/style.scss';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router basename='/'>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
);
