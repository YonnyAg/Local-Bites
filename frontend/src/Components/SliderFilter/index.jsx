// SliderComponent.jsx
import React, { useEffect, useRef } from 'react';
import './SliderFilter.css';
import categoriaSushi from '../../assets/slider/categoria_sushi.png';
import categoriaCarne from '../../assets/slider/categoria_carne.png';
import categoriaSalmon from '../../assets/slider/categoria_salmon.png';
import categoriaPizza from '../../assets/slider/categoria_pizza.png';
import categoriaPastas from '../../assets/slider/categoria_pastas.png';
import categoriaHamburguesas from '../../assets/slider/categoria_hamburguesas.png';
import categoriaPostres from '../../assets/slider/categoria_postres.png';
import categoriaDesayunos from '../../assets/slider/categoria_desayunos.png';

const SliderComponent = () => {
  const slideData = [
    { src: categoriaSushi, text: 'Sushi', categoria: 'sushi' },
    { src: categoriaCarne, text: 'Parrillas', categoria: 'carnes' },
    { src: categoriaSalmon, text: 'Comida de mar', categoria: 'mar' },
    { src: categoriaPizza, text: 'Pizza', categoria: 'pizza' },
    { src: categoriaPastas, text: 'Pastas', categoria: 'pastas' },
    { src: categoriaHamburguesas, text: 'Hamburguesa', categoria: 'hamburguesas' },
    { src: categoriaPostres, text: 'Postres', categoria: 'postres' },
    { src: categoriaDesayunos, text: 'Desayunos', categoria: 'desayunos' }
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;

    const scrollSlider = () => {
      scrollAmount += 1;
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
      }
      slider.scrollLeft = scrollAmount;
    };

    const intervalId = setInterval(scrollSlider, 20);

    return () => clearInterval(intervalId);
  }, []);

  const handleCategoryClick = (categoria) => {
    window.postMessage(categoria, '*');
  };

  return (
    <div ref={sliderRef} className="slider-filter-css">
      <div className="slide-track-filter-css">
        {[...slideData, ...slideData].map((slide, index) => (
          <div key={index} className="slide" onClick={() => handleCategoryClick(slide.categoria)}>
            <button className="sushi-button">
              <img src={slide.src} alt={slide.text} />
              <div className="text-overlay">{slide.text}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
