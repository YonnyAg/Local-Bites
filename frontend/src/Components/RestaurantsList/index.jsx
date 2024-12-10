import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sushiLogo from '../../assets/slider/categoria_carne.png';

const Restaurante = ({ selectedCategory, onClearFilters, onDataLoaded }) => {
  const navigate = useNavigate();
  const [restaurantes, setRestaurantes] = useState([]);
  const [localidad, setLocalidad] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const BASE_URL = "https://local-bites-backend.onrender.com/";

  const fetchRestaurantes = async () => {
    try {
      const response = await fetch('https://local-bites-backend.onrender.com/api/restaurantes/');
      const data = await response.json();
      setRestaurantes(data);
      console.log("Restaurantes:", restaurantes);
      if (onDataLoaded) onDataLoaded(); // Notifica que los datos están listos
    } catch (error) {
      console.error('Error fetching restaurantes:', error);
    }
  };

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const handleLocalidadChange = (e) => setLocalidad(e.target.value);
  const handleBusquedaChange = (e) => setBusqueda(e.target.value);
  const handleClearFilters = () => {
    setLocalidad('todas');
    setBusqueda('');
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const handleRestauranteClick = (restaurante) => navigate(`/restaurante/${restaurante.id}`);

  const restaurantesFiltrados = restaurantes.filter(
    (restaurante) =>
      (localidad === 'todas' || restaurante.location === localidad) &&
      (!selectedCategory || restaurante.food_types_names.includes(selectedCategory)) &&
      restaurante.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const truncateText = (text, maxLength) => {
    if (!text) return ''; // Devuelve un string vacío si el texto es undefined o null
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mt-8">
        {selectedCategory ? `Categoría: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'Todas las Categorías'}
      </h2>
      <div className="filter-container flex flex-col w-4/5 mt-6 mb-4">
        <div className="flex items-center">
          <select
            value={localidad}
            onChange={handleLocalidadChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
            style={{ width: '20%', marginRight: '5px' }}
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
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            style={{ marginLeft: '5px' }}
          />
        </div>

        <button
          onClick={handleClearFilters}
          className="clear-button p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none mt-4"
        >
          Eliminar Filtros
        </button>
      </div>

      <div className="mt-8 w-full flex flex-col items-center space-y-6">
        {restaurantesFiltrados.map((restaurante, index) => (
          <button
            key={index}
            onClick={() => handleRestauranteClick(restaurante)}
            className="restaurant-item flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg py-6 px-8 w-4/5 transform transition-transform duration-300 hover:scale-105 focus:outline-none text-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={restaurante.image || sushiLogo}
                alt={restaurante.name}
                className="restaurant-logo w-12 h-12 rounded-full"
              />
              <h3 className="text-lg font-bold text-gray-900">{restaurante.name}</h3>
            </div>
            <div className="restaurant-info w-full">
              <p className="text-gray-600 mt-4 md:mt-0 md:text-center">
                {truncateText(restaurante.description, 100)}
              </p>
              <p className="text-gray-600 md:text-center">Tipos de comida: {restaurante.food_types_names.join(', ')}</p>
            </div>
            <div className="restaurant-rating text-orange-500 font-semibold text-xl mt-4 md:mt-0 md:text-right">
              {restaurante.rating}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Restaurante;

