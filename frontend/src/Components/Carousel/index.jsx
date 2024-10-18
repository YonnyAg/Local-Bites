import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c3/79/94/caption.jpg?w=600&h=400&s=1',
        'https://guiaviajera.cl/wp-content/uploads/2023/07/Restaurant-Pancul-de-San-Jose-De-La-Mariquina-1024x491.jpeg',
        'https://via.placeholder.com/400x200.png?text=Imagen+3'
    ];

    const totalItems = images.length;

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % totalItems);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + totalItems) % totalItems);
    };

    // useEffect para el cambio automático de imágenes
    useEffect(() => {
        const interval = setInterval(nextSlide, 20000); // Cambiar cada 20 segundos

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [currentIndex]); // Dependencia en currentIndex para reiniciar el intervalo

    return (
        <div className="relative w-full overflow-hidden">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div className="min-w-[100%] h-[700px] mx-auto" key={index}>
                        <img src={image} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
                ›
            </button>
        </div>
    );
};

export default Carousel;
