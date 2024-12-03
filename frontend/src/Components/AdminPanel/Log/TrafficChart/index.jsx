import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TrafficPieChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://local-bites-sepia.vercel.app/api/traffic-analysis/")
            .then((response) => response.json())
            .then((data) => {
                // Utiliza los datos tal como vienen del backend
                setData(data);
            });
    }, []);

    // Colores para el gráfico
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#8dd1e1"];

    return (
        <PieChart width={800} height={400}>
            <Pie
                data={data}
                dataKey="visits"
                nameKey="friendly_name" // Usamos el campo friendly_name del backend
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={(entry) => entry.friendly_name} // Etiquetas amigables directamente del backend
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, name]} /> {/* No necesita transformación */}
            <Legend formatter={(value) => value} /> {/* Usa el valor directamente */}
        </PieChart>
    );
};

export default TrafficPieChart;
