import React, { useState, useEffect } from "react";

const AddRestaurant = ({ onClose, setRestaurants }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: "",
    location: "lanco",
    food_types: [],
    phone: "",
    exact_location: "",
    place_id: "",
    image: null,
  });
  const [foodTypes, setFoodTypes] = useState([]); // Para almacenar los tipos de comida desde el backend
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Obtener los food_types desde el backend
  useEffect(() => {
    const fetchFoodTypes = async () => {
      try {
        const response = await fetch("https://local-bites-backend.onrender.com/api/food_types/");
        if (!response.ok) {
          throw new Error("Error al cargar los tipos de comida");
        }
        const data = await response.json();
        setFoodTypes(data); // Guardar los tipos de comida
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los tipos de comida.");
      }
    };

    fetchFoodTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    const value = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      food_types: e.target.checked
        ? [...prev.food_types, value] // Agregar el ID si está seleccionado
        : prev.food_types.filter((id) => id !== value), // Eliminar el ID si se deselecciona
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    // Construir FormData
    Object.keys(formData).forEach((key) => {
      if (key === "food_types") {
        formData[key].forEach((id) => formDataToSend.append("food_types", id));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      const response = await fetch("https://local-bites-backend.onrender.com/api/restaurantes/add/", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (response.ok) {
        const newRestaurant = await response.json();
        console.log("Restaurante creado:", newRestaurant);
  
        // Actualizar la lista en tiempo real
        setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
  
        setSuccess(true);
        setError(null);
        onClose(); // Cierra el modal tras el éxito
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setError("No se pudo agregar el restaurante. Revisa los datos.");
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setError("Error de conexión con el servidor.");
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
          <label className="block text-gray-700">Tipos de Comida</label>
          {foodTypes.length > 0 ? (
            <div className="flex flex-wrap">
              {foodTypes.map((foodType) => (
                <label key={foodType.id} className="mr-4">
                  <input
                    type="checkbox"
                    value={foodType.id}
                    checked={formData.food_types.includes(foodType.id)}
                    onChange={handleCheckboxChange}
                  />
                  {foodType.name}
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Cargando tipos de comida...</p>
          )}
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
          <label className="block text-gray-700">Google Place ID</label>
          <input
            type="text"
            name="place_id"
            value={formData.place_id}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
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
