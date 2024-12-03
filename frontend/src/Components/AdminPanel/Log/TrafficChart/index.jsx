import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TrafficPieChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://local-bites-backend.onrender.com/api/traffic-analysis/")
            .then((response) => response.json())
            .then((data) => {
                const formattedData = data.reduce((acc, curr) => {
                    const existing = acc.find((item) => item.url === curr.url);
                    if (existing) {
                        existing.visits += curr.visits;
                    } else {
                        acc.push({ url: curr.url, visits: curr.visits });
                    }
                    return acc;
                }, []);
                setData(formattedData);
            });
    }, []);

    // Colores para el gráfico
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#8dd1e1"];

    // Función para convertir URL a nombre amigable
    const getFriendlyName = (url) => {
        const lastPart = url.split("/").pop(); // Obtiene la última parte de la URL
        return lastPart.charAt(0).toUpperCase() + lastPart.slice(1); // Capitaliza la primera letra
    };

    return (
        <PieChart width={800} height={400}>
            <Pie
                data={data}
                dataKey="visits"
                nameKey="url"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={(entry) => getFriendlyName(entry.url)} // Etiquetas amigables
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, getFriendlyName(name)]} />
            <Legend formatter={(value) => getFriendlyName(value)} />
        </PieChart>
    );
};

export default TrafficPieChart;
