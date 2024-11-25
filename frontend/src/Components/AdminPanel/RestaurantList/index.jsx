import React, { useState, useEffect } from "react";
import AddRestaurant from "../AddRestaurant";
import Modal from "../AddRestaurant/Modal";
import { TrashIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/restaurantes/");
        if (!response.ok) {
          throw new Error("Error al cargar los datos de restaurantes");
        }
        const data = await response.json();
        setRestaurants(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const openDeleteModal = (restaurant) => {
    setRestaurantToDelete(restaurant);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setRestaurantToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (restaurantToDelete) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/restaurantes/${restaurantToDelete.id}/delete/`,
          { method: "DELETE" }
        );

        if (response.ok) {
          setRestaurants((prevRestaurants) =>
            prevRestaurants.filter(
              (restaurant) => restaurant.id !== restaurantToDelete.id
            )
          );
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
        }
      } catch (err) {
        console.error("Error al conectar con el servidor:", err);
        alert("Error de conexión con el servidor.");
      } finally {
        closeDeleteModal();
      }
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">
          Lista de Restaurantes
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Agregar Restaurante
        </button>
      </div>

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <AddRestaurant
          onClose={() => setShowAddForm(false)}
          setRestaurants={setRestaurants}
        />
      </Modal>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
            <div className="flex items-center mb-4">
              <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
              <h2 className="text-lg font-bold ml-2">Eliminar Restaurante</h2>
              <button
                className="ml-auto text-gray-500 hover:text-gray-700"
                onClick={closeDeleteModal}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-700 text-sm md:text-base">
              ¿Estás seguro de que deseas eliminar el restaurante{" "}
              <span className="font-bold">{restaurantToDelete.name}</span>?
            </p>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md mr-2 hover:bg-gray-400 transition"
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar restaurante..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando restaurantes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="min-w-full w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 text-sm md:text-base">#</th>
                <th className="px-4 py-2 text-sm md:text-base">Nombre</th>
                <th className="px-4 py-2 text-sm md:text-base">Ubicación</th>
                <th className="px-4 py-2 text-sm md:text-base">Acciones</th>
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
                    <td className="px-4 py-2 text-sm md:text-base">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base max-w-xs truncate">
                      {restaurant.name}
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">
                      {restaurant.location}
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">
                      <button className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition">
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-md hover:bg-red-600 transition"
                        onClick={() => openDeleteModal(restaurant)}
                      >
                        <TrashIcon className="h-4 w-4 inline-block md:h-5 md:w-5" />{" "}
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
