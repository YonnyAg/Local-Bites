import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const ReviewSection = ({ restauranteId }) => {
    const [googleReviews, setGoogleReviews] = useState([]);
    const [siteReviews, setSiteReviews] = useState([]);
    const [loadingGoogle, setLoadingGoogle] = useState(true);
    const [loadingSite, setLoadingSite] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [showPopup, setShowPopup] = useState(false); // Estado para controlar el pop-up
    const navigate = useNavigate();

    // Comprobar si el usuario está autenticado
    const isAuthenticated = () => {
        return !!localStorage.getItem('accessToken');
    };

    // Función para obtener las reseñas de Google
    const fetchGoogleReviews = async () => {
        try {
            const response = await fetch(`https://local-bites-backend.onrender.com/api/google-reviews/${restauranteId}/`);
            if (!response.ok) {
                throw new Error('Error al obtener las reseñas de Google.');
            }
            const data = await response.json();
            setGoogleReviews(data.result.reviews || []);
        } catch (error) {
            console.error('Error fetching Google reviews:', error);
            setError('No se pudieron cargar las reseñas de Google.');
        } finally {
            setLoadingGoogle(false);
        }
    };

    // Función para obtener las reseñas del sitio web
    const fetchSiteReviews = async () => {
        try {
            const response = await fetch(`https://local-bites-backend.onrender.com/api/api/comments/${restauranteId}/`);
            if (!response.ok) {
                throw new Error('Error al obtener las reseñas del sitio web.');
            }
            const data = await response.json();
            setSiteReviews(data || []);
        } catch (error) {
            console.error('Error fetching site reviews:', error);
            setError('No se pudieron cargar las reseñas del sitio web.');
        } finally {
            setLoadingSite(false);
        }
    };

    // Función para agregar un nuevo comentario
    const addComment = async (e) => {
        e.preventDefault();

        // Verificar autenticación
        if (!isAuthenticated()) {
            setShowPopup(true); // Muestra el pop-up si no está autenticado
            return;
        }

        // Validar que haya un comentario y calificación
        if (!newComment || !rating) {
            alert("Debes ingresar un comentario y una calificación.");
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('https://local-bites-backend.onrender.com/api/api/comments/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant_id: restauranteId, // ID del restaurante
                    text: newComment,
                    rating: rating, // Calificación
                }),
            });

            if (response.ok) {
                const newReview = await response.json();
                setSiteReviews((prev) => [...prev, newReview]); // Agregar comentario a la lista
                setNewComment(''); // Reiniciar el input del comentario
                setRating(0); // Reiniciar la calificación
            } else {
                throw new Error('No se pudo agregar el comentario.');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Ocurrió un error. Intenta más tarde.');
        }
    };

    useEffect(() => {
        if (restauranteId) {
            fetchGoogleReviews();
            fetchSiteReviews();
        }
    }, [restauranteId]);

    return (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Comentarios de Google */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Opiniones de Google</h2>
                {loadingGoogle ? (
                    <p>Cargando reseñas de Google...</p>
                ) : googleReviews.length > 0 ? (
                    googleReviews.map((review, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                            <div className="flex items-center">
                                <img
                                    src={review.profile_photo_url || 'https://via.placeholder.com/50'}
                                    alt={review.author_name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <span className="font-semibold">{review.author_name}</span>
                                <span className="ml-2 text-yellow-500">{'★'.repeat(Math.round(review.rating))}</span>
                            </div>
                            <p className="text-gray-700 mt-2">{review.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No hay reseñas disponibles para este restaurante en Google.</p>
                )}
            </div>

            {/* Comentarios del sitio web */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Opiniones del Sitio Web</h2>
                {loadingSite ? (
                    <p>Cargando reseñas del sitio web...</p>
                ) : siteReviews.length > 0 ? (
                    siteReviews.map((review, index) => (
                        <div key={index} className="border-b pb-4 mb-4 flex items-start">
                            <img
                                src={review.user.profile_picture || 'https://via.placeholder.com/50'}
                                alt={review.user.username}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{review.user.username}</p>
                                <div className="text-yellow-500">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <p className="text-gray-700">{review.text}</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No hay reseñas disponibles para este restaurante en el sitio web.</p>
                )}

                {/* Formulario para agregar comentarios */}
                <form onSubmit={addComment} className="mt-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Escribe tu comentario..."
                        required
                    />
                    <div className="mt-2">
                        <label className="block text-gray-700">Calificación:</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="p-2 border rounded-md w-full"
                        >
                            <option value="">Selecciona una calificación</option>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>
                                    {star} Estrella{star > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Enviar Comentario
                    </button>
                </form>
            </div>

            {/* Pop-Up */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white p-8 rounded-lg shadow-xl text-center space-y-4 transform transition-transform duration-300 scale-105">
                        <ExclamationCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
                        <p className="text-lg font-bold text-gray-800">Para comentar debes iniciar sesión</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                        >
                            Ir al Login
                        </button>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition-all duration-300"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewSection;
