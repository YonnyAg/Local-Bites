import React, { useState } from 'react';
import { UserIcon, EnvelopeIcon, MapPinIcon, ListBulletIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    ubicacion: 'Lanco',
    motivo: 'Motivo 1',
    mensaje: '',
  });

  const [emailError, setEmailError] = useState(''); // Para manejar el error de correo electrónico
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Controla si se muestra el mensaje de éxito

  const maxCharacters = 1000;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'correo') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.(com|cl)$/;
      setEmailError(emailPattern.test(value) ? '' : 'Por favor, ingresa un correo válido de Gmail (.com o .cl)');
    }

    if (name === 'mensaje' && value.length > maxCharacters) return;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getCsrfToken = async () => {
    try {
      const response = await fetch('https://local-bites-backend.onrender.com/api/api/csrf/');
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const csrfToken = await getCsrfToken();

    if (!emailError) {
      try {
        const response = await fetch('https://local-bites-backend.onrender.com/api/api/contact/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Incluir el token CSRF
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setShowSuccessMessage(true); // Mostrar mensaje de éxito
          setTimeout(() => setShowSuccessMessage(false), 3000); // Ocultar mensaje automáticamente después de 3 segundos
          setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            ubicacion: 'Lanco',
            motivo: 'Motivo 1',
            mensaje: '',
          });
        } else {
          console.error('Error al enviar los datos:', response.statusText);
          alert('Error al enviar los datos.');
        }
      } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        alert('Error al conectar con el servidor.');
      }
    } else {
      alert('Por favor, corrige los errores antes de enviar.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        
        {/* Mensaje de éxito */}
        {showSuccessMessage && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 animate-fade-in">
              <CheckCircleIcon className="w-12 h-12 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-800">¡Mensaje enviado exitosamente!</h2>
              <p className="text-gray-600 text-center">Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.</p>
            </div>
          </div>
        )}

        {/* Sección de Información */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Contáctanos</h2>
          <p className="text-gray-600">
            Nos encontramos en tu ciudad y estamos aquí para ayudarte.
            Si tienes preguntas sobre nuestros servicios o necesitas
            información adicional, no dudes en contactarnos.
          </p>
          <p className="text-gray-600">
            Estamos disponibles para responder a tus dudas y ayudarte con
            lo que necesites.
          </p>
        </div>

        {/* Sección del Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <div className="flex items-center">
                <UserIcon className="w-5 h-5 text-gray-400 absolute ml-2" />
                <input
                  type="text"
                  name="nombre"
                  placeholder="Juan"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 p-2 pl-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Apellido */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <div className="flex items-center">
                <UserIcon className="w-5 h-5 text-gray-400 absolute ml-2" />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Pérez"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="mt-1 p-2 pl-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <div className="flex items-center">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute ml-2" />
              <input
                type="email"
                name="correo"
                placeholder="ejemplo@gmail.com"
                value={formData.correo}
                onChange={handleChange}
                className="mt-1 p-2 pl-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
          </div>

          {/* Ubicación */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Ubicación</label>
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 text-gray-400 absolute ml-2" />
              <select
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                className="mt-1 p-2 pl-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Lanco">Lanco</option>
                <option value="Mariquina">Mariquina</option>
              </select>
            </div>
          </div>

          {/* Motivo */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Motivo</label>
            <div className="flex items-center">
              <ListBulletIcon className="w-5 h-5 text-gray-400 absolute ml-2" />
              <select
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                className="mt-1 p-2 pl-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Contacto">Contacto</option>
                <option value="Sugerencia">Sugerencia</option>
                <option value="Agregar local">Agregar local</option>
              </select>
            </div>
          </div>

          {/* Mensaje */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea
              name="mensaje"
              placeholder="Escribe tu mensaje aquí"
              value={formData.mensaje}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            ></textarea>
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.mensaje.length}/{maxCharacters} caracteres
            </div>
          </div>

          {/* Botón de Enviar */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200"
              disabled={!!emailError}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
