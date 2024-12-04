import React, { useState } from "react";
import Sliderbar from "./Sliderbar";
import RestaurantList from "./RestaurantList"; 
import ContactRequests from "./ContactRequest";
import CategoryList from "./CategoryList";
import TrafficChart from "./Log/TrafficChart";
import UserAnalytics from "./Log/UserRegister";

const AdminPanel = () => {
  const [active, setActive] = useState("restaurantes");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sliderbar active={active} setActive={setActive} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Renderizar el contenido basado en el estado activo */}
        {active === "restaurantes" && (
          <div className="flex-1 overflow-auto">
            <RestaurantList />
          </div>
        )}
        {active === "contacto" && (
          <div className="flex-1 overflow-auto">
            <ContactRequests />
          </div>
        )}
        {active === "categorias" && (
          <div className="flex-1 overflow-auto">
            <CategoryList />
          </div>
        )}
        {active === "logview" && (
          <div className="flex-1 overflow-auto">
            <TrafficChart />
          </div>
        )}
        {active === "userview" && (
          <div className="flex-1 overflow-auto">
            <UserAnalytics />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
