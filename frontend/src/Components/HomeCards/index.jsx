import React from 'react';

const Card = ({ image, description, buttonText }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={image} alt="Card image" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{description}</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const Cards = () => {
  const cardsData = [
    {
      image: 'https://via.placeholder.com/150',
      description: 'Descripción de la tarjeta 1',
      buttonText: 'Botón 1',
    },
    {
      image: 'https://via.placeholder.com/150',
      description: 'Descripción de la tarjeta 2',
      buttonText: 'Botón 2',
    },
    {
      image: 'https://via.placeholder.com/150',
      description: 'Descripción de la tarjeta 3',
      buttonText: 'Botón 3',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            description={card.description}
            buttonText={card.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
