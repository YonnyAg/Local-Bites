import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PhoneIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import GoogleMapComponent from './GoogleMap';
import ReviewSection from './ReviewSection';
import sushiImage from '../../assets/slider/categoria_sushi.png';

const ProfilePage = () => {
  const { id } = useParams(); // Obtiene el ID del restaurante desde la URL
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  // Llama a la API para obtener los datos del restaurante
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/restaurante/${id}/`); // Cambia la URL según tu backend
        const data = await response.json();
        setRestaurantInfo(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (!restaurantInfo) {
    return <p>Cargando perfil del restaurante...</p>;
  }

  return (
    <div className="relative w-full">
      {/* Banner */}
      <div className="relative w-full h-80 mb-8 overflow-hidden border border-black shadow-lg rounded-md">
        <img src={restaurantInfo.image || sushiImage} alt={restaurantInfo.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-white">{restaurantInfo.name}</h1>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="w-full flex flex-col lg:flex-row gap-6 px-4">
        {/* Mapa */}
        <div className="w-full lg:w-2/5 shadow-lg rounded-md overflow-hidden">
          <GoogleMapComponent location={restaurantInfo.exact_location} className="h-full w-full" />
        </div>

        {/* Información del restaurante */}
        <div className="w-full lg:w-3/5 p-6 bg-white shadow-lg rounded-md transition duration-300 transform hover:bg-gray-100 hover:shadow-2xl">
          <div className="mb-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-700">
              <InformationCircleIcon className="h-6 w-6 text-blue-500 mr-2" />
              Sobre el Restaurante
            </h2>
            <p className="text-gray-700 leading-relaxed">{restaurantInfo.description}</p>
          </div>


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


          {/* Contact Information */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200">
              <PhoneIcon className="h-5 w-5 text-blue-500" />
              <span>{restaurantInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200">
              <EnvelopeIcon className="h-5 w-5 text-blue-500" />
              <span>{restaurantInfo.email}</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href={restaurantInfo.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-4xl mx-auto px-4">
        {restaurantInfo.categories?.map((category, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">{category.title}</h3>
            <div className="flex overflow-x-scroll space-x-4">
              {category.items.map((item, idx) => (
                <div key={idx} className="flex-none w-60 bg-white shadow-md rounded-lg overflow-hidden p-4 text-center">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2" />
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Opiniones */}
      <ReviewSection restauranteId={restaurantInfo.id} />

      {/* Botón flotante de WhatsApp */}
      <a
        href={restaurantInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6 mr-2"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.09.532 4.071 1.545 5.851L.046 23.454l5.678-1.485A11.966 11.966 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.047c-1.906 0-3.79-.487-5.447-1.392l-.39-.214-3.367.882.9-3.277-.247-.403C2.744 15.676 2.25 13.856 2.25 12 2.25 6.485 6.485 2.25 12 2.25S21.75 6.485 21.75 12 17.515 21.75 12 21.75z" />
          <path d="M17.216 13.857l-2.18-.63a.735.735 0 00-.69.19l-.7.715a7.136 7.136 0 01-3.272-3.272l.715-.7a.74.74 0 00.19-.69l-.63-2.18a.737.737 0 00-.712-.528h-1.022a2.07 2.07 0 00-2.065 2.065c0 3.901 3.18 7.08 7.08 7.08a2.07 2.07 0 002.065-2.065v-1.022a.737.737 0 00-.529-.712z" />
        </svg>
        Contact via WhatsApp
      </a>
    </div>
  );
};

export default ProfilePage;
