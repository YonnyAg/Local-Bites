import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartBarIcon, HomeIcon, PhoneIcon, LoginIcon, MapPinIcon } from "@heroicons/react/24/solid";

const TrafficPieChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://local-bites-backend.onrender.com/api/traffic-analysis/")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    // Colores para las categorías
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#8dd1e1"];

    // Calcular totales
    const totalVisits = data.reduce((acc, curr) => acc + curr.visits, 0);

    // Filtrar las categorías principales (Home, Locales, etc.)
    const pageCategories = data.filter(
        (item) => ["Home", "Locales", "Contacto", "Login"].includes(item.friendly_name)
    );

    // Filtrar restaurantes
    const restaurantVisits = data.filter(
        (item) => !["Home", "Locales", "Contacto", "Login"].includes(item.friendly_name)
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

                {/* Categorías principales */}
                {pageCategories.map((category, index) => (
                    <div
                        key={index}
                        className={`flex items-center p-4 rounded w-full mb-2 ${
                            index % 2 === 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {category.friendly_name === "Home" && <HomeIcon className="h-6 w-6 mr-4" />}
                        {category.friendly_name === "Locales" && <MapPinIcon className="h-6 w-6 mr-4" />}
                        {category.friendly_name === "Contacto" && <PhoneIcon className="h-6 w-6 mr-4" />}
                        {category.friendly_name === "Login" && <LoginIcon className="h-6 w-6 mr-4" />}
                        <span className="font-semibold">{category.friendly_name}:</span>
                        <span className="ml-auto text-lg">{category.visits} visitas</span>
                    </div>
                ))}

                {/* Restaurantes */}
                {restaurantVisits.length > 0 && (
                    <div className="w-full mt-4">
                        <h3 className="text-lg font-bold mb-2 text-gray-700">Visitas por Restaurantes</h3>
                        <ul className="bg-gray-100 p-4 rounded shadow">
                            {restaurantVisits.map((restaurant, index) => (
                                <li key={index} className="flex justify-between py-1">
                                    <span>{restaurant.friendly_name}</span>
                                    <span className="font-semibold">{restaurant.visits} visitas</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrafficPieChart;
