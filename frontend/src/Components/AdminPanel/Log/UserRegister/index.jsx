import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartBarIcon, UsersIcon } from "@heroicons/react/24/solid";

const UserAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        total_users: 0,
        this_week: 0,
        weekly_data: [],
    });

    useEffect(() => {
        fetch("https://local-bites-backend.onrender.com/api/user_analytics/")
            .then((response) => response.json())
            .then((data) => {
                console.log("Datos recibidos:", data);
                setAnalytics(data);
            });
    }, []);

    return (
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded shadow-lg mt-4">
            {/* Título */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Analítica de Usuarios</h2>

            {/* Gráfico de barras */}
            <div className="w-full flex justify-center mb-6">
                <BarChart
                    width={600}
                    height={300}
                    data={analytics.weekly_data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="registrations" fill="#8884d8" name="Usuarios registrados" />
                </BarChart>
            </div>

            {/* Total de Usuarios */}
            <div className="flex items-center bg-blue-100 text-blue-800 p-4 rounded w-full mb-4">
                <UsersIcon className="h-6 w-6 mr-4" />
                <span className="font-semibold">Total de usuarios registrados:</span>
                <span className="ml-auto text-lg">{analytics.total_users}</span>
            </div>

            {/* Usuarios Registrados esta Semana */}
            <div className="flex items-center bg-green-100 text-green-800 p-4 rounded w-full">
                <ChartBarIcon className="h-6 w-6 mr-4" />
                <span className="font-semibold">Usuarios registrados esta semana:</span>
                <span className="ml-auto text-lg">{analytics.this_week}</span>
            </div>
        </div>
    );
};

export default UserAnalytics;
