import React, { useState, useEffect } from 'react';
import sushiLogo from '../../assets/slider/categoria_carne.png';
import { useNavigate } from 'react-router-dom';

const Restaurante = () => {
  const navigate = useNavigate();
  const [restaurantes, setRestaurantes] = useState([]); // Estado para almacenar los restaurantes
  const [localidad, setLocalidad] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [tipoComida, setTipoComida] = useState(''); // Estado para el tipo de comida
  const [loading, setLoading] = useState(true); // Estado para mostrar el estado de carga
  const BASE_URL = "http://localhost:8000"; // Define la URL base del backend

  // Función para obtener los restaurantes desde el backend
  const fetchRestaurantes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/restaurantes/'); // Cambia la URL si es necesario
      const data = await response.json();
      setRestaurantes(data); // Actualiza los restaurantes con los datos de la API
    } catch (error) {
      console.error('Error fetching restaurantes:', error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Escucha el mensaje enviado por el slider y actualiza el tipo de comida
  useEffect(() => {
    fetchRestaurantes(); // Obtiene los restaurantes al cargar el componente

    const handleCategoryMessage = (event) => {
      setTipoComida(event.data);
    };

    window.addEventListener('message', handleCategoryMessage);

    return () => window.removeEventListener('message', handleCategoryMessage);
  }, []);

  const handleLocalidadChange = (e) => {
    setLocalidad(e.target.value);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleClearFilters = () => {
    setLocalidad('todas');
    setBusqueda('');
    setTipoComida('');
  };

  const handleRestauranteClick = (restaurante) => {
    navigate(`/restaurante/${restaurante.id}`);
  };

  // Filtra los restaurantes según los filtros seleccionados
  const restaurantesFiltrados = restaurantes.filter(
    (restaurante) =>
      (localidad === 'todas' || restaurante.location === localidad) &&
      (tipoComida === '' || restaurante.food_types.includes(tipoComida)) &&
      restaurante.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <p>Cargando restaurantes...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mt-8">
        {tipoComida ? `Categoría: ${tipoComida.charAt(0).toUpperCase() + tipoComida.slice(1)}` : 'Todas las Categorías'}
      </h2>

      {/* Navbar de Filtro */}
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


      {/* Lista de restaurantes */}
      <div className="mt-8 w-full flex flex-col items-center space-y-6">
        {restaurantesFiltrados.map((restaurante, index) => (
          <button
            key={index}
            onClick={() => handleRestauranteClick(restaurante)}
            className="restaurant-item flex items-center justify-between bg-white shadow-lg rounded-lg py-6 px-8 w-4/5 transform transition-transform duration-300 hover:scale-105 focus:outline-none"
          >
            <div className="flex items-center space-x-4">
            <img
              src={`${BASE_URL}${restaurante.image}`}
              alt={restaurante.name}
              className="restaurant-logo w-12 h-12 rounded-full"
            />

              <div className="restaurant-info">
                <h3 className="text-lg font-bold text-gray-900">{restaurante.name}</h3>
                <p className="text-gray-600 hidden md:block">{restaurante.description}</p>
                <p className="text-gray-600 hidden md:block">Tipos de comida: {restaurante.food_types.join(', ')}</p>
              </div>
            </div>
            <div className="restaurant-rating text-orange-500 font-semibold text-xl">{restaurante.rating}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Restaurante;