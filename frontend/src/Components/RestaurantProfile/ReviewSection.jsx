import React, { useEffect, useState } from 'react';

const ReviewSection = ({ restauranteId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener las reseñas del backend de Django
    const fetchReviews = async () => {
        try {
            // Llama al endpoint dinámico con el restauranteId
            const response = await fetch(`http://127.0.0.1:8000/api/google-reviews/${restauranteId}/`);
            if (!response.ok) {
                throw new Error('Error al obtener las reseñas.');
            }

            const data = await response.json();
            console.log("Fetched reviews:", data.result.reviews); // Verifica las reseñas en la consola
            setReviews(data.result.reviews || []); // Ajusta según la estructura de datos de tu API
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setError("No se pudieron cargar las reseñas. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    // Llama a fetchReviews cuando el componente se monte o cuando restauranteId cambie
    useEffect(() => {
        if (restauranteId) {
            fetchReviews();
        }
    }, [restauranteId]);

    if (loading) {
        return <p>Cargando reseñas...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Opiniones de Google</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 mb-4">
                        <div className="flex items-center">
                            <span className="font-semibold">{review.author_name}</span>
                            <span className="ml-2 text-yellow-500">{'★'.repeat(Math.round(review.rating))}</span>
                        </div>
                        <p className="text-gray-700 mt-2">{review.text}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No hay reseñas disponibles para este restaurante.</p>
            )}
        </div>
    );
};

export default ReviewSection;
