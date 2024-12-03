import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import SliderComponent from "../../Components/SliderFilter";
import Restaurants from "../../Components/RestaurantsList";
import LoaderLogin from "../../Components/Loaders/LoaderLogin"; // Importa tu componente de loader
import logVisit from '../../Components/LogVisit';

function Premises() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado para el loader

  useEffect(() => {
    logVisit(); // Llama a logVisit al cargar la página
  }, []); // [] asegura que solo se ejecuta una vez

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('');
  };

  // Función para ocultar el loader una vez que todo esté cargado
  const handleDataLoaded = () => {
    setIsLoading(false); // Cambiar el estado de carga
  };

  return (
    <>
      {isLoading && <LoaderLogin />} {/* Muestra el loader mientras isLoading es true */}
      <Layout>
        <SliderComponent onCategorySelect={handleCategorySelect} />
        <Restaurants
          selectedCategory={selectedCategory}
          onClearFilters={handleClearAllFilters}
          onDataLoaded={handleDataLoaded} // Notifica cuando los datos están listos
        />
      </Layout>
    </>
  );
}

export default Premises;
