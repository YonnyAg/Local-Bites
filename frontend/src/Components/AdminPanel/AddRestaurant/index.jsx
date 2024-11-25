import React, { useState } from "react";

const AddRestaurant = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: "",
    location: "lanco", // Valor por defecto
    food_types: [],
    phone: "",
    exact_location: "",
    place_id: "",
    image: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "food_types") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(
        "https://local-bites-backend.onrender.com/api/restaurantes/add/",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar el restaurante.");
      }

      setSuccess(true);
      setError(null);
      onClose(); // Cerrar el modal o formulario después del éxito
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Agregar Restaurante</h2>

      {success && <p className="text-green-500 mb-4">¡Restaurante agregado con éxito!</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Calificación</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ubicación</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="lanco">Lanco</option>
            <option value="mariquina">Mariquina</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ubicación Exacta</label>
          <input
            type="text"
            name="exact_location"
            value={formData.exact_location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Imagen</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
