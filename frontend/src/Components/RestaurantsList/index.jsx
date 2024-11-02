import React, { useState } from 'react';
import sushiLogo from '../../assets/slider/categoria_carne.png'; // Asegúrate de tener una imagen de ejemplo

const Restaurante = () => {
  const [localidad, setLocalidad] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  const restaurantes = [
    { name: 'Yu Sushi', description: 'Consumo en el local, Retiro', rating: 4.8, location: 'lanco' },
    { name: 'Tonizzia', description: 'Consumo en el local, Retiro', rating: 4.8, location: 'mariquina' },
    { name: 'Tonizzia', description: 'Consumo en el local, Retiro', rating: 4.8, location: 'lanco' },
    { name: 'Tonizzia', description: 'Consumo en el local, Retiro', rating: 4.8, location: 'mariquina' },
    { name: 'Tonizzia', description: 'Consumo en el local, Retiro', rating: 4.8, location: 'lanco' },
    // Agrega más restaurantes si deseas
];

  const handleLocalidadChange = (e) => {
    setLocalidad(e.target.value);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const restaurantesFiltrados = restaurantes.filter(
    (restaurante) =>
      (localidad === 'todas' || restaurante.location === localidad) &&
      restaurante.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mt-8">Todas las Categorías</h2>

      {/* Navbar de Filtro */}
      <div className="flex items-center justify-between w-4/5 mt-6 mb-4 space-x-4">
        <select
          value={localidad}
          onChange={handleLocalidadChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todas">Todas</option>
          <option value="lanco">Lanco</option>
          <option value="mariquina">Mariquina</option>
        </select>

        <input
          type="text"
          placeholder="Buscar restaurante..."
          value={busqueda}
          onChange={handleBusquedaChange}
          className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-8 w-full flex flex-col items-center space-y-6">
        {restaurantesFiltrados.map((restaurante, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white shadow-lg rounded-lg py-6 px-8 w-4/5 transform transition-transform duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <img src={sushiLogo} alt={restaurante.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{restaurante.name}</h3>
                <p className="text-gray-600">{restaurante.description}</p>
              </div>
            </div>
            <div className="text-orange-500 font-semibold text-xl">{restaurante.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurante;
