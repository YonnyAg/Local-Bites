import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import GoogleMapComponent from './GoogleMap';
import RestaurantInfo from '../RestaurantProfile/Info/RestaurantInfo';
import Banner from '../RestaurantProfile/Banner/Banner';
import Loader from '../../Components/Loaders/LoaderLogin'; // Asegúrate de importar tu loader

const ReviewSection = ({ restauranteId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://local-bites-backend.onrender.com/api/google-reviews/${restauranteId}/`);
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
    return null; // El loader principal se encargará de esto
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
  const [loading, setLoading] = useState(true); // Estado para el loader
  const BASE_URL = "https://local-bites-backend.onrender.com"; // Define la URL base del backend

  // Llama a la API para obtener los datos del restaurante
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`https://local-bites-backend.onrender.com/api/restaurantes/${id}/`);
        const data = await response.json();
        setRestaurantInfo(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      } finally {
        setLoading(false); // Finaliza el loader
      }
    };

    fetchRestaurantData();
  }, [id]);

  // Retorna el loader si el estado de carga está activo
  if (loading) {
    return <Loader />;
  }

  // Renderiza el contenido una vez que todo ha cargado
  return (
    <div className="relative w-full">
      {/* Banner */}
      <Banner name={restaurantInfo.name} image={`${BASE_URL}${restaurantInfo.image}`} />

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
        href='https://wa.me/12345789'
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.837.746 5.522 2.164 7.931l-2.331 7.038 7.209-2.273c2.14 1.22 4.591 1.863 7.084 1.863 8.837 0 16-7.163 16-16s-7.163-16-16-16zm8.969 23.12c-.375 1.053-1.877 2-3.082 2.276-.867.186-2.058.337-6.572-1.406-5.517-2.299-9.051-8.511-9.314-8.913-.264-.402-2.237-2.973-2.237-5.677s1.419-4.006 2.004-4.568c.554-.526 1.473-.764 2.308-.69.599.054 1.251.088 1.801 1.386.708 1.653 2.372 5.74 2.448 6.149.077.409.129.878-.025 1.277-.151.394-.227.852-.45 1.219-.226.369-.466.595-.7.9-.234.305-.472.68-.197 1.222.276.542 1.226 2.016 2.633 3.269 1.808 1.609 3.379 2.082 3.876 2.313.497.231.784.194 1.069-.121.286-.314 1.241-1.449 1.574-1.944.329-.494.659-.418 1.126-.236.468.182 3.001 1.414 3.514 1.672.513.259.854.394.983.61.129.215.129 1.252-.245 2.304z" />
        </svg>
      </a>

    </div>
  );
};

export default ProfilePage;
