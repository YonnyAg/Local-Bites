import React from 'react';
import Slider from 'react-slick';
import sushiImage from '../../assets/slider/categoria_sushi.png';
import sandwichImage from '../../assets/slider/categoria_hamburguesas.png';
import dessertImage from '../../assets/slider/categoria_postres.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import sandwich_toffer from '../../assets/CarouselHome/Food/sandwiche-toffer.jpg'
import sandwich_tonizzia from '../../assets/CarouselHome/Food/sandwiche-tonizzia.jpg'
import sandwich_fuerte from '../../assets/CarouselHome/Food/sandwiche-fuerte.png'

import parrilla_tonizzia from '../../assets/CarouselHome/Food/parrilla-tonizzia.jpg'
import parrilla_tonizzia2 from '../../assets/CarouselHome/Food/parrilla-tonizzia2.jpg'
import parrilla_tonizzia3 from '../../assets/CarouselHome/Food/parrilla-tonizzia3.jpg'

import tabla_toffer from '../../assets/CarouselHome/Food/tabla-toffer.jpg'
import tabla_toffer2 from '../../assets/CarouselHome/Food/tabla-toffer2.jpg'
import tabla_fuerte from '../../assets/CarouselHome/Food/tabla-fuerte.png'

const categories = [
  {
    title: 'Sandwiches',
    items: [
      { name: 'Sandwich Tonizzia', description: 'Carne de res + Cebolla + Queso...', price: '$7.200', rating: 4.7, image: sandwich_tonizzia, link: '/restaurante/23' },
      { name: 'Barros Luco', description: 'Carne de res + queso fundido', price: '$7.000', rating: 4.5, image: sandwich_toffer, link: '/restaurante/24' },
      { name: 'Barros Luco', description: 'Carne de res + queso fundido', price: '$6.500', rating: 4.5, image: sandwich_fuerte, link: '/restaurante/25' },
    ],
  },
  {
    title: 'Parrillas',
    items: [
      { name: 'Lomo vetado', description: 'Acompañado con puré', price: '$7.900', rating: 4.5, image: parrilla_tonizzia, link: '/restaurante/23' },
      { name: 'Entrecot y bife chorizo', description: 'Plato especial', price: '$7.900', rating: 4.8, image: parrilla_tonizzia2, link: '/restaurante/23' },
      { name: 'Bife chorizo', description: 'Plato especial', price: '$7.900', rating: 4.2, image: parrilla_tonizzia3, link: '/restaurante/23' },
    ],
  },
  {
    title: 'Para Picar',
    items: [
      { name: 'Pichanga', description: 'Pichanga para dos personas', price: '$15.000', rating: 4.4, image: tabla_toffer, link: '/restaurante/24' },
      { name: 'Chorillana', description: 'Chorillana para tres personas', price: '$12.000', rating: 4.3, image: tabla_toffer2, link: '/restaurante/24' },
      { name: 'Pichanga', description: 'Individual', price: '$10.000', rating: 4.1, image: tabla_fuerte, link: '/restaurante/25' },
    ],
  },
];

const CarouselWithCategories = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-8 flex justify-center">
      <div className="w-3/5">
        {categories.map((category, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
            <Slider {...settings}>
              {category.items.map((item, idx) => (
                <div key={idx} className="p-4">
                  <div className="bg-white shadow-md rounded-lg overflow-hidden text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-semibold text-gray-700">{item.price}</span>
                        <div className="flex items-center">
                          <span className="text-orange-500 font-semibold">{item.rating}</span>
                          <svg className="w-4 h-4 ml-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.294 9.397c-.784-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                          </svg>
                        </div>
                      </div>
                      <button
                        onClick={() => window.location.href = item.link}
                        className="mt-4 w-full py-2 bg-[#FFC600] text-white font-semibold rounded-lg hover:bg-[#FFC34A] transition-colors"
                      >
                        Ver restaurante
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselWithCategories;
