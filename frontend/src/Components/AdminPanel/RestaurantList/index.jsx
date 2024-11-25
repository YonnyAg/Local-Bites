import React, { useState, useEffect } from "react";
import AddRestaurant from "../AddRestaurant";
import Modal from "../AddRestaurant/Modal"; // Asegúrate de importar correctamente Modal

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]); // Estado de la lista
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Estado para el modal

  // Obtener restaurantes desde la API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "https://local-bites-backend.onrender.com/api/restaurantes/"
        );
        if (!response.ok) {
          throw new Error("Error al cargar los datos de restaurantes");
        }
        const data = await response.json();
        setRestaurants(data); // Guardar los datos en el estado
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Filtrar restaurantes según el término de búsqueda
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lista de Restaurantes</h2>
        <button
          onClick={() => setShowAddForm(true)} // Abrir el modal
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Agregar Restaurante
        </button>
      </div>

      {/* Modal para agregar restaurante */}
      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <AddRestaurant 
          onClose={() => setShowAddForm(false)} 
          setRestaurants={setRestaurants} // Pasamos setRestaurants aquí
        />
      </Modal>



      {/* Campo de Búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar restaurante..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla de Restaurantes */}
      <div>
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando restaurantes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Ubicación</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant, index) => (
                  <tr
                    key={restaurant.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{restaurant.name}</td>
                    <td className="px-4 py-2">{restaurant.location}</td>
                    <td className="px-4 py-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition">
                        Editar
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No se encontraron resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
