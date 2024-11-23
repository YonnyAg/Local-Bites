import React from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";

const UserReviews = () => {
  const reviews = [
    {
      restaurant: "Tonizzia",
      comments: [
        { user: "Juan Pérez", avatar: "https://via.placeholder.com/50", text: "La pizza estuvo increíble, volvería sin dudar.", stars: 5 },
        { user: "Juan Pérez", avatar: "https://via.placeholder.com/50", text: "Me encantaron las pastas, buen servicio.", stars: 4 },
      ],
    },
    {
      restaurant: "Toffer",
      comments: [
        { user: "Juan Pérez", avatar: "https://via.placeholder.com/50", text: "El lugar es acogedor, pero la comida podría mejorar.", stars: 3 },
      ],
    },
    {
      restaurant: "Pancul",
      comments: [
        { user: "Juan Pérez", avatar: "https://via.placeholder.com/50", text: "¡Los completos son los mejores que he probado!", stars: 5 },
        { user: "Juan Pérez", avatar: "https://via.placeholder.com/50", text: "Buena relación calidad-precio.", stars: 4 },
        { user: "Juan Pérez", avatar: "https://via.placeholder.com/50", text: "El servicio puede ser un poco lento, pero vale la pena.", stars: 4 },
      ],
    },
  ];

  const renderStars = (stars) => Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < stars ? "text-yellow-500" : "text-gray-300"}>★</span>
  ));

  return (
    <div className="relative container mx-auto p-4">
      {/* Panel de información */}
      <div className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-lg shadow-lg p-6 text-white mb-6 lg:mb-0 panel-info-css panel-info-css">
        <h2 className="text-2xl font-extrabold mb-6 flex items-center space-x-2">
          <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-white" />
          <span>Resumen de Comentarios</span>
        </h2>
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="flex justify-between items-center bg-white text-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <span className="font-medium">{review.restaurant}</span>
              <span className="text-gray-600">{review.comments.length} comentarios</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lista de comentarios */}
      <div className="lg:ml-[35%]">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 relative inline-block group">
          Comentarios del Usuario
          <span className="absolute left-0 bottom-0 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </h1>
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6 p-6 group hover:bg-yellow-50">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 group-hover:border-yellow-400 transition-all">{review.restaurant}</h2>
            <ul className="space-y-4">
              {review.comments.map((comment, idx) => (
                <li key={idx} className="flex items-start space-x-4 border-b pb-4 last:border-none hover:bg-yellow-100 rounded-md transition-all">
                  <img src={comment.avatar} alt={comment.user} className="w-12 h-12 rounded-full border border-gray-300 hover:border-yellow-400 transition-all" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 group-hover:text-yellow-500 transition-all">{comment.user}</p>
                    <p className="text-gray-800">{comment.text}</p>
                    <div className="flex space-x-1 mt-2">{renderStars(comment.stars)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
