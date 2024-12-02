import React, { useEffect, useState } from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]); // Estado para los comentarios
  const [loading, setLoading] = useState(true);

  // Obtener comentarios del backend
  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://local-bites-backend.onrender.com/api/api/comments/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data); // Actualiza el estado con los comentarios
      } else {
        console.error("Error fetching comments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderStars = (stars) =>
    Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < stars ? "text-yellow-500" : "text-gray-300"}>★</span>
    ));

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative container mx-auto p-4">
      {/* Panel de información */}
      <div className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-lg shadow-lg p-6 text-white mb-6 lg:mb-0 panel-info-css">
        <h2 className="text-2xl font-extrabold mb-6 flex items-center space-x-2">
          <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-white" />
          <span>Resumen de Comentarios</span>
        </h2>
        {reviews.length === 0 ? (
          <p className="text-center text-gray-800 bg-white p-4 rounded-lg shadow-md">
            Aún no tienes comentarios. ¡Visita{" "}
            <a
              href="/locales"
              className="text-yellow-500 font-bold hover:underline"
            >
              algún restaurante
            </a>{" "}
            para comentar!
          </p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="flex justify-between items-center bg-white text-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="font-medium">{review.restaurant_name}</span>
                <span className="text-gray-600">{review.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lista de comentarios */}
      <div className="lg:ml-[35%]">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 relative inline-block group">
          Comentarios del Usuario
          <span className="absolute left-0 bottom-0 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </h1>
        {reviews.length === 0 ? (
          <div className="text-center bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-800">
              Aún no tienes comentarios. ¡Visita{" "}
              <a
                href="/restaurantes"
                className="text-yellow-500 font-bold hover:underline"
              >
                algún restaurante
              </a>{" "}
              para comentar!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6 p-6 group hover:bg-yellow-50"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 group-hover:border-yellow-400 transition-all">
                {review.restaurant_name}
              </h2>
              <p className="text-gray-800">{review.text}</p>
              <div className="flex space-x-1 mt-2">{renderStars(review.rating)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserReviews;
