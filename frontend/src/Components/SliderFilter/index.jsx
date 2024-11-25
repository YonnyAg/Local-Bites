import React, { useEffect, useRef, useState } from 'react';
import './SliderFilter.css';
import categoriaSushi from '../../assets/slider/categoria_sushi.png';
import categoriaCarne from '../../assets/slider/categoria_carne.png';
import categoriaSalmon from '../../assets/slider/categoria_salmon.png';
import categoriaPizza from '../../assets/slider/categoria_pizza.png';
import categoriaPastas from '../../assets/slider/categoria_pastas.png';
import categoriaHamburguesas from '../../assets/slider/categoria_hamburguesas.png';
import categoriaPostres from '../../assets/slider/categoria_postres.png';
import categoriaDesayunos from '../../assets/slider/categoria_desayunos.png';

const SliderComponent = ({ onCategorySelect }) => {
  const [foodTypes, setFoodTypes] = useState([]);
  const sliderRef = useRef(null);

  // Mapa de imágenes según el nombre del tipo de comida
  const imageMap = {
    sushi: categoriaSushi,
    carnes: categoriaCarne,
    mar: categoriaSalmon,
    pizza: categoriaPizza,
    pastas: categoriaPastas,
    hamburguesas: categoriaHamburguesas,
    postres: categoriaPostres,
    desayunos: categoriaDesayunos,
  };

  // Fetch para obtener los tipos de comida desde el backend
  useEffect(() => {
    const fetchFoodTypes = async () => {
      try {
        const response = await fetch('https://local-bites-backend.onrender.com/api/food_types/');
        const data = await response.json();
        setFoodTypes(data); // Actualiza los tipos de comida
      } catch (error) {
        console.error('Error al cargar los tipos de comida:', error);
      }
    };

    fetchFoodTypes();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    const startInfiniteScroll = () => {
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0; // Reinicia el scroll al llegar a la mitad
      } else {
        slider.scrollLeft += 1; // Incrementa el desplazamiento
      }
    };

    const intervalId = setInterval(startInfiniteScroll, 20);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleCategoryClick = (categoria) => {
    onCategorySelect(categoria);
  };

  // Duplicar elementos para el bucle infinito
  const duplicatedFoodTypes = [...foodTypes, ...foodTypes]; // Duplicamos los elementos

  return (
    <div ref={sliderRef} className="slider-filter-css">
      <div className="slide-track-filter-css">
        {duplicatedFoodTypes.map((foodType, index) => (
          <div key={index} className="slide" onClick={() => handleCategoryClick(foodType.name)}>
            <button className="sushi-button">
              <img
                src={imageMap[foodType.name.toLowerCase()] || categoriaSushi} // Usa la imagen o una por defecto
                alt={foodType.name}
              />
              <div className="text-overlay">{foodType.name.charAt(0).toUpperCase() + foodType.name.slice(1)}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
