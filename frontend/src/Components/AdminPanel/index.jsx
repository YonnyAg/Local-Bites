import React, { useState } from "react";
import Sliderbar from "./Sliderbar";
import RestaurantList from "./RestaurantList"; 
import ContactRequests from "./ContactRequest";
import CategoryList from "./CategoryList";

const AdminPanel = () => {
  const [active, setActive] = useState("restaurantes");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sliderbar active={active} setActive={setActive} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {active === "restaurantes" && (
          <RestaurantList /> // Renderiza la lista de restaurantes
        )}
        {active === "contacto" && (
          <ContactRequests />
        )}
        {active === "categorias" && (
          <CategoryList />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
