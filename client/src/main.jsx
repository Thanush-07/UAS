// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App.jsx'; // Comment out the main App
import AdminPage from './pages/AdminDashboard'; // Import AdminPage directly

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <AdminPage /> {/* Render ONLY the AdminPage */}
  </React.StrictMode>,
);
