// src/components/AdminDashboard.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LogsTable from './LogsTable';

const loginData = [ // This data would come from your API
  { name: 'Mon', logins: 400 },
  { name: 'Tue', logins: 300 },
  { name: 'Wed', logins: 200 },
  { name: 'Thu', logins: 278 },
  { name: 'Fri', logins: 189 },
];

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 dark:text-white">Admin Dashboard</h2>

      <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Login Attempts Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={loginData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="logins" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Audit Logs</h3>
        <LogsTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
