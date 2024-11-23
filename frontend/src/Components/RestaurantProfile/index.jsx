import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, InformationCircleIcon, StarIcon,} from '@heroicons/react/24/solid';
import GoogleMapComponent from './GoogleMap';
import RestaurantInfo from '../RestaurantProfile/Info/RestaurantInfo';
import Banner from '../RestaurantProfile/Banner/Banner';

const ReviewSection = ({ restauranteId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/google-reviews/${restauranteId}/`);
      if (!response.ok) {
        throw new Error('Error al obtener las opiniones.');
      }
      const data = await response.json();
      setReviews(data.result.reviews || []);
    } catch (error) {
      setError('No se pudieron cargar las opiniones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restauranteId) {
      fetchReviews();
    }
  }, [restauranteId]);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando opiniones...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Opiniones de Google</h2>
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.profile_photo_url || 'https://via.placeholder.com/50'}
                  alt={review.author_name}
                  className="w-12 h-12 rounded-full shadow-md mr-4"
                />
                <div>
                  <p className="font-bold text-gray-800">{review.author_name}</p>
                  <p className="text-yellow-500 text-sm">
                    {'★'.repeat(Math.round(review.rating))}
                    {'☆'.repeat(5 - Math.round(review.rating))}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay opiniones disponibles para este restaurante.</p>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { id } = useParams(); // Obtiene el ID del restaurante desde la URL
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const BASE_URL = "http://localhost:8000"; // Define la URL base del backend

  // Llama a la API para obtener los datos del restaurante
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/restaurante/${id}/`);
        const data = await response.json();
        setRestaurantInfo(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (!restaurantInfo) {
    return <p className="text-center text-gray-500">Cargando perfil del restaurante...</p>;
  }

  return (
    <div className="relative w-full">
      {/* Banner */}
      <Banner name={restaurantInfo.name} image={`${BASE_URL}${restaurantInfo.image}`}  />

      {/* Contenedor principal */}
      <div className="w-full flex flex-col lg:flex-row gap-6 px-4">
        {/* Mapa */}
        <div className="w-full lg:w-2/5 shadow-lg rounded-md overflow-hidden">
          <GoogleMapComponent location={restaurantInfo.exact_location} />
        </div>

        {/* Información del restaurante */}
        <div className="w-full lg:w-3/5">
          <RestaurantInfo restaurantInfo={restaurantInfo} />
        </div>
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
        Contactar por WhatsApp
      </a>
    </div>
  );
};

export default ProfilePage;
