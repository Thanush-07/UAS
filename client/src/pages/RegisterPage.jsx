// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { zxcvbnCommonPackage } from '@zxcvbn-ts/language-common';
import { zxcvbnEnPackage } from '@zxcvbn-ts/language-en';
import api from '../services/api';
import PasswordStrength from '../components/PasswordStrength';
import ToastNotification from '../components/ToastNotification';

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.graphs,
  dictionary: { ...zxcvbnCommonPackage.dictionary, ...zxcvbnEnPackage.dictionary },
};
zxcvbnOptions.setOptions(options);

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [passwordScore, setPasswordScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') {
      const result = zxcvbn(value);
      setPasswordScore(result.score);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordScore < 3) {
      showToast('Password is too weak. Please choose a stronger one.', 'error');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/register', formData);
      showToast('Registration successful! Please check your email to verify.', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      showToast(error.response?.data?.message || 'Registration failed.', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ToastNotification notification={notification} onDismiss={() => setNotification({ show: false })} />
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username" required onChange={handleChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <div>
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <PasswordStrength score={passwordScore} />
          </div>
          <button type="submit" disabled={loading || passwordScore < 3} className="w-full p-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-transform transform hover:scale-105">
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
