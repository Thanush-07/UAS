// src/components/LogsTable.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/admin/logs'); // Your API endpoint for logs
        setLogs(response.data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);
  
  const handleExportPDF = async () => {
    // PDF export logic here
    alert("Exporting logs to PDF...");
  };

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="dark:text-white">Loading logs...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <input type="text" placeholder="Search logs..." onChange={e => setSearchTerm(e.target.value)} className="mb-4 p-2 w-full rounded dark:bg-gray-700"/>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table Head and Body */}
        </table>
      </div>
       <button onClick={handleExportPDF} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Export PDF</button>
    </div>
  );
};
