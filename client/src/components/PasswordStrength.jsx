// src/components/PasswordStrength.jsx
import React from 'react';

const PasswordStrength = ({ score }) => {
  const strengthLevels = [
    { text: 'Very Weak', color: 'bg-red-500', width: '20%' },
    { text: 'Weak', color: 'bg-orange-500', width: '40%' },
    { text: 'Fair', color: 'bg-yellow-500', width: '60%' },
    { text: 'Good', color: 'bg-blue-500', width: '80%' },
    { text: 'Strong', color: 'bg-green-500', width: '100%' },
  ];

  const currentStrength = strengthLevels[score] || strengthLevels[0];

  return (
    <div className="w-full mt-2">
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${currentStrength.color}`}
          style={{ width: currentStrength.width }}
        ></div>
      </div>
      <p className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">
        {currentStrength.text}
      </p>
    </div>
  );
};

export default PasswordStrength;
