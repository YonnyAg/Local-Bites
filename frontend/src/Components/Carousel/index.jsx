// src/Components/Carousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import tonizzia from '../../assets/CarouselHome/logo_tonizzia.jpg';
import toffer from '../../assets/CarouselHome/logo_toffer.jpg';
import fuerte from '../../assets/CarouselHome/logo_fuerte.jpg';

const Carousel = () => {
    const slides = [
        {
            img: tonizzia,
            title: 'Tonizzia',
            subtitle: 'Tonizzia restaurante-bar, ofrece carnes a la parrilla y platos de la zona, además de una variada carta de tragos',
            link: '#',
        },
        {
            img: toffer,
            title: 'Cafetería Pentukun',
            subtitle: 'Toffer restaurante, con gran variedad de platos y almuerzo los días de semana.',
            link: '#',
        },
        {
            img: fuerte,
            title: 'El fuerte',
            subtitle: ' El fuerte restobar es un local dedicado a la gastronomía fusión con variedad de cervezas artesanales de San José de la Mariquina.',
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
                        <div className="bg-white rounded-lg p-5 shadow-md border hover:border-[#FFC600] transition duration-300">
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
                                <button className="mt-4 w-full py-2 bg-[#FFC600] text-white rounded-lg hover:bg-[#FFC34A] transition duration-300">
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
