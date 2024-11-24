import React, { useState } from "react";

const ContactRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      suggestion: "Me gustaría que añadieran más opciones vegetarianas.",
      read: false,
    },
    {
      id: 2,
      name: "María López",
      email: "maria@example.com",
      suggestion: "¿Podrían mejorar el tiempo de respuesta en los pedidos?",
      read: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // Filtrar solicitudes
  const filteredRequests = requests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Marcar como leído
  const markAsRead = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, read: true } : req
      )
    );
  };

  // Eliminar solicitud
  const deleteRequest = (id) => {
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  // Abrir modal
  const openModal = (content) => {
    setModalContent(content);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Solicitudes de Contacto</h2>
      </div>

      {/* Campo de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla de solicitudes */}
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Correo Electrónico</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <tr
                key={request.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{request.name}</td>
                <td className="px-4 py-2">{request.email}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                    onClick={() => {
                      openModal(request.suggestion);
                      markAsRead(request.id);
                    }}
                  >
                    Leer
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    onClick={() => deleteRequest(request.id)}
                  >
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

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-bold mb-4">Sugerencia</h3>
            <p className="mb-4">{modalContent}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactRequests;
