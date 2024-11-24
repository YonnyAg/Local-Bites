import React, { useState } from "react";

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Sushi" },
    { id: 2, name: "Pizza" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Filtrar categorías
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para agregar o editar categoría
  const openModal = (category = null) => {
    setIsEditing(!!category);
    setCurrentCategory(category);
    setModalContent({
      title: category ? "Editar Categoría" : "Agregar Categoría",
      inputValue: category ? category.name : "",
    });
  };

  // Cerrar modal
  const closeModal = () => {
    setModalContent(null);
    setCurrentCategory(null);
  };

  // Guardar categoría (agregar o editar)
  const saveCategory = (name) => {
    if (isEditing) {
      // Editar categoría existente
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === currentCategory.id ? { ...category, name } : category
        )
      );
    } else {
      // Agregar nueva categoría
      setCategories((prevCategories) => [
        ...prevCategories,
        { id: Date.now(), name },
      ]);
    }
    closeModal();
  };

  // Eliminar categoría
  const deleteCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lista de Categorías</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Agregar Categoría
        </button>
      </div>

      {/* Campo de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar categoría..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla de categorías */}
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Nombre de Categoría</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <tr
                key={category.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    onClick={() => openModal(category)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">{modalContent.title}</h3>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={modalContent.inputValue}
              onChange={(e) =>
                setModalContent((prev) => ({
                  ...prev,
                  inputValue: e.target.value,
                }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => saveCategory(modalContent.inputValue)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
