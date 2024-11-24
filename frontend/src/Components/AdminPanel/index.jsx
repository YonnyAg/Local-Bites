// AdminPanel.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <ul className="flex space-x-4 mt-8">
            <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/users" className="hover:underline">Usuarios</a></li>
        </ul>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;




