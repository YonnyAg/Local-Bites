import React, { useState } from 'react';

const Carousel = () => {
    const products = [
        {
            name: 'La Rikissima Comidas Rápidas',
            time: '20-35 min',
            cost: 'Envio $1390',
            image: '/path-to-image/burger.png',
            isNew: true,
        },
        {
            name: 'Novo Sushi & Fries',
            time: '20-35 min',
            cost: 'Envio $1690',
            image: '/path-to-image/sushi.png',
            isNew: true,
        },
        {
            name: 'Sandwichería Ocaranza',
            time: '25-40 min',
            cost: 'Envio $2090',
            rating: '5.0',
            image: '/path-to-image/sandwich.png',
        },
        {
            name: 'Pizza al Paso',
            time: '15-20 min',
            cost: 'Envio $890',
            image: '/path-to-image/pizza.png',
        },
        {
            name: 'Donas Yummy',
            time: '10-15 min',
            cost: 'Envio $700',
            image: '/path-to-image/donuts.png',
        },
        {
            name: 'Pastelería Dulce Sabor',
            time: '20-30 min',
            cost: 'Envio $990',
            image: '/path-to-image/cake.png',
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleProducts = 3; // Número de productos visibles al mismo tiempo

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - visibleProducts : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - visibleProducts ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="carousel-container relative w-full">
            <h2 className="text-2xl font-semibold mb-4">Lo nuevo en PedidosYa</h2>
            
            {/* Flechas de navegación */}
            <button onClick={handlePrevClick} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white rounded-full p-3 shadow-lg hover:bg-gray-800 z-10">
                ◀
            </button>
            <button onClick={handleNextClick} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-3 shadow-lg hover:bg-gray-800 z-10">
                ▶
            </button>

            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)` }}
                >
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="min-w-[calc(100%/3)] bg-white shadow-md rounded-lg overflow-hidden mx-2"
                        >
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <p className="text-sm">{product.time} · {product.cost}</p>
                                {product.isNew && <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full">Nuevo</span>}
                                {product.rating && (
                                    <div className="mt-2 flex items-center">
                                        <span className="text-orange-500 text-lg">★</span>
                                        <span className="ml-1 text-lg font-bold">{product.rating}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
