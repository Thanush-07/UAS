// src/components/ToastNotification.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const icons = {
  success: <CheckCircleIcon className="h-6 w-6 mr-2" />,
  error: <XCircleIcon className="h-6 w-6 mr-2" />,
  anomaly: <ExclamationTriangleIcon className="h-6 w-6 mr-2" />,
};

const bgColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  anomaly: 'bg-yellow-500',
};

const ToastNotification = ({ notification, onDismiss }) => {
  if (!notification.show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        transition={{ duration: 0.4 }}
        className={`fixed bottom-5 right-5 flex items-center p-4 rounded-lg text-white shadow-lg ${bgColors[notification.type]}`}
        role="alert"
      >
        {icons[notification.type]}
        <span>{notification.message}</span>
        <button onClick={onDismiss} className="ml-4 text-xl font-bold">&times;</button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToastNotification;
