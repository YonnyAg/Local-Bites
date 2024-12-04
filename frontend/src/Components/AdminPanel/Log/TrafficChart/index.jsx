import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartBarIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/solid";

const TrafficPieChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://local-bites-backend.onrender.com/api/traffic-analysis/")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    // Colores para el gráfico
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#8dd1e1"];

    // Calcular totales (visitas totales y categorías principales)
    const totalVisits = data.reduce((acc, curr) => acc + curr.visits, 0);
    const topCategory = data.reduce((prev, current) =>
        prev.visits > current.visits ? prev : current,
        { friendly_name: "N/A", visits: 0 }
    );

    return (
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded shadow-lg">
            {/* Título */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Análisis de Tráfico</h2>

            {/* Gráfico */}
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    dataKey="visits"
                    nameKey="friendly_name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={(entry) => `${entry.friendly_name} (${entry.visits})`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} visitas`, "Categoría"]} />
                <Legend formatter={(value) => value} />
            </PieChart>

            {/* Información relevante */}
            <div className="mt-6 w-full flex flex-col items-center">
                {/* Total visitas */}
                <div className="flex items-center bg-blue-100 text-blue-800 p-4 rounded w-full mb-2">
                    <ChartBarIcon className="h-6 w-6 mr-4" />
                    <span className="font-semibold">Total de visitas:</span>
                    <span className="ml-auto text-lg">{totalVisits}</span>
                </div>

                {/* Categoría más visitada */}
                <div className="flex items-center bg-green-100 text-green-800 p-4 rounded w-full mb-2">
                    <MapPinIcon className="h-6 w-6 mr-4" />
                    <span className="font-semibold">Categoría más visitada:</span>
                    <span className="ml-auto text-lg">{topCategory.friendly_name}</span>
                </div>

                {/* Detalle de la categoría más visitada */}
                <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded w-full">
                    <UserIcon className="h-6 w-6 mr-4" />
                    <span className="font-semibold">Visitas de {topCategory.friendly_name}:</span>
                    <span className="ml-auto text-lg">{topCategory.visits}</span>
                </div>
            </div>
        </div>
    );
};

export default TrafficPieChart;
