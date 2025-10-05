// src/pages/AdminDashboard.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', logins: 42 },
  { name: 'Tue', logins: 55 },
  { name: 'Wed', logins: 38 },
  { name: 'Thu', logins: 61 },
  { name: 'Fri', logins: 74 },
  { name: 'Sat', logins: 92 },
  { name: 'Sun', logins: 85 },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">System overview and analytics.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Weekly Login Activity</h2>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.9)',
                      border: 'none',
                      borderRadius: '0.75rem',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="logins" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar Content: Stats */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Users</h3>
              <p className="text-5xl font-bold mt-2">1,204</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Logins Today</h3>
              <p className="text-5xl font-bold mt-2">85</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Server Status</h3>
              <p className="text-2xl font-bold mt-4 flex items-center justify-center text-green-500">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Online
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
