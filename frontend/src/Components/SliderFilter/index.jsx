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
    { src: categoriaSushi, text: 'Sushi', link: '/login' },
    { src: categoriaCarne, text: 'Parrillas', link: '/' },
    { src: categoriaSalmon, text: 'Comida de mar', link: '/' },
    { src: categoriaPizza, text: 'Pizza', link: '/' },
    { src: categoriaPastas, text: 'Pastas', link: '/' },
    { src: categoriaHamburguesas, text: 'Hamburguesa', link: '/' },
    { src: categoriaPostres, text: 'Postres', link: '/' },
    { src: categoriaDesayunos, text: 'Desayunos', link: '/' }
  ];

  // Referencia para el slider
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;

    const scrollSlider = () => {
      scrollAmount += 1; // Velocidad de desplazamiento
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0; // Reinicia el scroll al principio
      }
      slider.scrollLeft = scrollAmount;
    };

    const intervalId = setInterval(scrollSlider, 20); // Controla la velocidad

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div ref={sliderRef} className="slider">
      <div className="slide-track">
        {[...slideData, ...slideData].map((slide, index) => (
          <div key={index} className="slide">
            <a href={slide.link} className="sushi-button" target="_parent">
              <img src={slide.src} alt={slide.text} />
              <div className="text-overlay">{slide.text}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
