import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Usuarios Activos</h3>
        <p className="text-3xl font-bold text-blue-600">120</p>
      </div>
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Nuevas Ventas</h3>
        <p className="text-3xl font-bold text-green-600">$4,200</p>
      </div>
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Comentarios</h3>
        <p className="text-3xl font-bold text-purple-600">32</p>
      </div>
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Visitas</h3>
        <p className="text-3xl font-bold text-red-600">1,023</p>
      </div>
    </div>
  );
};

export default Dashboard;
