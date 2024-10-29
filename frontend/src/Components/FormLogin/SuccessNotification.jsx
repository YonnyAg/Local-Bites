import React from 'react';

const SuccessNotification = ({ visible, onClose, goToLogin }) => {
  return (
    visible && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-8 pt-16 rounded-lg shadow-lg text-center success-notification-box relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            &times;
          </button>
          <div className="check-icon absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 text-green-500"
            >
              <circle cx="12" cy="12" r="10" fill="#22c55e" />
              <path
                d="M9.5 13.5l2.5 2.5 5-5"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-4 text-gray-700 mt-10">
            Tu cuenta se ha creado correctamente.
          </h2>
          <button
            onClick={goToLogin} // Llama a goToLogin para redirigir al formulario de inicio de sesión
            className="mt-4 bg-purple-700 text-white py-2 px-6 rounded hover:bg-purple-800 transition duration-200"
          >
            Empezar ahora
          </button>
        </div>
      </div>
    )
  );
};

export default SuccessNotification;
