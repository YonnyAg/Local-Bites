import React from 'react';
import { PhoneIcon, EnvelopeIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/solid';

const RestaurantInfo = ({ restaurantInfo }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      {/* Descripción */}
      <div className="mb-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-700">
          <InformationCircleIcon className="h-6 w-6 text-blue-500 mr-2" />
          Sobre el Restaurante
        </h2>
        <p className="text-gray-700 leading-relaxed">{restaurantInfo.description}</p>
      </div>

      {/* Especialidades */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-500 mr-2" />
          Especialidad
        </h3>
        <ul className="ml-7 space-y-3">
          {restaurantInfo.food_types.map((type, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 bg-yellow-100 text-yellow-900 p-3 rounded-lg shadow-md hover:bg-yellow-200 hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center bg-yellow-500 text-white rounded-full">
                <StarIcon className="h-4 w-4" />
              </span>
              <span className="font-medium">{type}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contacto */}
      <div className="mt-6 p-6 bg-green-50 border-l-4 border-green-500 rounded-md shadow-md">
        <h3 className="text-lg font-bold flex items-center text-green-700 mb-4">
          Contacto
        </h3>
        <div className="space-y-4">
          <div className="flex items-center bg-green-100 p-3 rounded-md shadow-sm hover:bg-green-200 transition-colors">
            <PhoneIcon className="h-6 w-6 text-green-700 mr-3" />
            <span className="text-green-900 font-medium">{restaurantInfo.phone}</span>
          </div>
          <div className="flex items-center bg-green-100 p-3 rounded-md shadow-sm hover:bg-green-200 transition-colors">
            <EnvelopeIcon className="h-6 w-6 text-green-700 mr-3" />
            <span className="text-green-900 font-medium">{restaurantInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Ver menú */}
      <div className="mt-6 text-center">
        <a
          href={restaurantInfo.menuUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg"
        >
          Ver Menú
        </a>
      </div>
    </div>
  );
};

export default RestaurantInfo;
