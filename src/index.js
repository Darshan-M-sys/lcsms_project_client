import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import  AuthContextProvider  from './context/AuthContextProvider';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
