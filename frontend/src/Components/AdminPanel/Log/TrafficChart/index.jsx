import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartBarIcon, MapPinIcon } from "@heroicons/react/24/solid";

const TrafficPieChart = () => {
    const [dailyTraffic, setDailyTraffic] = useState([]);
    const [totalTraffic, setTotalTraffic] = useState([]);
    const [mostVisited, setMostVisited] = useState(null);

    useEffect(() => {
        fetch("https://local-bites-backend.onrender.com/api/traffic_analytics/")
            .then((response) => response.json())
            .then((data) => {
                // Filtrar datos con URLs o nombres amigables vacíos
                const filteredDailyTraffic = data.daily_traffic.filter(
                    (entry) => entry.url && entry.friendly_name
                );
                const filteredTotalTraffic = data.total_traffic.filter(
                    (entry) => entry.url && entry.friendly_name
                );

                setDailyTraffic(filteredDailyTraffic);
                setTotalTraffic(filteredTotalTraffic);

                // Calcular la URL más visitada si hay datos válidos
                if (filteredTotalTraffic.length > 0) {
                    const mostVisited = filteredTotalTraffic.reduce((prev, current) =>
                        prev.total_visits > current.total_visits ? prev : current
                    );
                    setMostVisited(mostVisited);
                }
            });
    }, []);

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#8dd1e1"];

    return (
        <div className="p-6">
            {/* Gráfico */}
            <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4 text-center">Tráfico Diario</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={dailyTraffic}
                        dataKey="visits"
                        nameKey="friendly_name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={(entry) => `${entry.friendly_name} (${entry.visits})`}
                    >
                        {dailyTraffic.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} visitas`, "Categoría"]} />
                    <Legend />
                </PieChart>
            </div>

            {/* URL más visitada */}
            {mostVisited && (
                <div className="mt-8 w-full bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded shadow-lg flex items-center">
                    <MapPinIcon className="h-10 w-10 text-blue-600 mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold text-blue-800">URL más visitada</h3>
                        <p className="text-gray-700">
                            <strong>URL:</strong> {mostVisited.friendly_name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Visitas Totales:</strong> {mostVisited.total_visits}
                        </p>
                    </div>
                </div>
            )}

            {/* Tabla */}
            <h2 className="text-xl font-bold mt-8 mb-4">Visitas Totales por URL</h2>
            <table className="min-w-full bg-white rounded shadow">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">URL</th>
                        <th className="py-2 px-4 text-left">Visitas Totales</th>
                    </tr>
                </thead>
                <tbody>
                    {totalTraffic.map((row, index) => (
                        <tr key={index} className="border-t">
                            <td className="py-2 px-4">{row.friendly_name}</td>
                            <td className="py-2 px-4">{row.total_visits}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrafficPieChart;
