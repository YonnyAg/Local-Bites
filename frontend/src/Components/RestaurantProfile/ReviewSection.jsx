import React, { useEffect, useState } from 'react';

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);

    // Función para obtener las reseñas del backend de Django
    const fetchReviews = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/google-reviews/?language=es');
            const data = await response.json();
            console.log("Fetched reviews:", data.result.reviews); // Asegúrate de que las reseñas se muestren aquí
            setReviews(data.result.reviews || []); // Ajuste para acceder correctamente a las reseñas
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };
    
    
    

    // Llama a fetchReviews cuando el componente se monte
    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Opiniones de Google</h2>
            {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                    <div className="flex items-center">
                        <span className="font-semibold">{review.author_name}</span>
                        <span className="ml-2 text-yellow-500">{'★'.repeat(Math.round(review.rating))}</span>
                    </div>
                    <p className="text-gray-700 mt-2">{review.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewSection;
