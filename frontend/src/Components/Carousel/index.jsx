// src/Components/Carousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Carousel = () => {
    const slides = [
        {
            img: '/imagenes/logo tonizzia.jpg',
            title: 'Tonizzia',
            subtitle: 'Una experiencia gastronómica única en San José de la Mariquina.',
            link: 'tonizzia.html',
        },
        {
            img: '/imagenes/logo cafeteria.jpg',
            title: 'Cafetería Pentukun',
            subtitle: 'Una experiencia gastronómica única en San José de la Mariquina.',
            link: '#',
        },
        {
            img: '/imagenes/logo toro de los rios.png',
            title: 'Toro de los rios',
            subtitle: 'Una experiencia gastronómica única en San José de la Mariquina.',
            link: 'restaurant1.html',
        },
        {
            img: '/imagenes/logo tonizzia.jpg',
            title: 'Tonizzia',
            subtitle: 'Una experiencia gastronómica única en San José de la Mariquina.',
            link: '#',
        },
    ];

    return (
        <div className="w-full px-5 py-10 mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1} // Configuración predeterminada para dispositivos móviles
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                    768: { slidesPerView: 2, spaceBetween: 30 }, // Dos imágenes en tablets
                    1024: { slidesPerView: 3, spaceBetween: 30 }, // Tres imágenes en computadoras grandes
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white rounded-lg p-5 shadow-md border hover:border-red-400 transition duration-300">
                            <a href={slide.link} className="block">
                                <img
                                    src={slide.img}
                                    alt={`${slide.title} image`}
                                    className="w-full rounded-md object-cover aspect-[16/9]"
                                />
                                <h1 className="text-xl font-semibold text-center mt-4 text-black">
                                    {slide.title}
                                </h1>
                                <h2 className="text-base text-center mt-2 text-black">
                                    {slide.subtitle}
                                </h2>
                                <button className="mt-4 w-full py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition duration-300">
                                    Ver menú
                                </button>
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
