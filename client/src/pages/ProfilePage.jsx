// src/pages/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Profile Page</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Welcome! This is a protected area.</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
