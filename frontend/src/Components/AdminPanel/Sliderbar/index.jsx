import React from "react";
import {
  ClipboardDocumentListIcon,
  InboxIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const Sliderbar = ({ active, setActive }) => {
  const links = [
    { name: "Lista de Restaurantes", icon: ClipboardDocumentListIcon, id: "restaurantes" },
    { name: "Solicitudes de Contacto", icon: InboxIcon, id: "contacto" },
    { name: "Categorías", icon: Squares2X2Icon, id: "categorias" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col mt-6">
      {/* Header */}
      <div className="p-4 text-center border-b border-gray-700">
        <h1 className="text-xl font-bold text-gray-200">Admin Panel</h1>
      </div>
      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href="#"
                onClick={() => setActive(link.id)}
                className={`flex items-center gap-4 p-3 rounded-md ${
                  active === link.id ? "bg-gray-700 text-white" : "text-gray-300"
                } hover:bg-gray-700 hover:text-white transition-colors`}
              >
                <link.icon className="h-6 w-6" />
                <span className="font-medium">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Footer */}
      <div className="p-4 text-center border-t border-gray-700">
        <p className="text-sm text-gray-400">© 2024 LocalBites</p>
      </div>
    </div>
  );
};

export default Sliderbar;
