import React, { useState } from "react";
import {
  ClipboardDocumentListIcon,
  InboxIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  GlobeAltIcon,
  UserIcon,
  ExclamationCircleIcon,
  Bars3Icon, // Nuevo icono para Logs
} from "@heroicons/react/24/outline";

const Sliderbar = ({ active, setActive }) => {
  const [isLogMenuOpen, setLogMenuOpen] = useState(false); // Estado para el menú desplegable

  const links = [
    { name: "Lista de Restaurantes", icon: ClipboardDocumentListIcon, id: "restaurantes" },
    { name: "Solicitudes de Contacto", icon: InboxIcon, id: "contacto" },
    { name: "Categorías", icon: Squares2X2Icon, id: "categorias" },
  ];

  const logLinks = [
    { name: "Log de URL", icon: GlobeAltIcon, id: "logview" },
    { name: "Log de Usuarios", icon: UserIcon, id: "userview" },
    { name: "Log de Errores", icon: ExclamationCircleIcon, id: "log-errores" },
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

          {/* Menú desplegable para Logs */}
          <li>
            <div
              onClick={() => setLogMenuOpen(!isLogMenuOpen)}
              className={`flex items-center justify-between gap-4 p-3 rounded-md cursor-pointer ${
                isLogMenuOpen || logLinks.some((log) => active === log.id)
                  ? "bg-gray-700 text-white"
                  : "text-gray-300"
              } hover:bg-gray-700 hover:text-white transition-colors`}
            >
              <div className="flex items-center gap-4">
                <Bars3Icon className="h-6 w-6" /> {/* Icono actualizado */}
                <span className="font-medium">Logs</span>
              </div>
              {isLogMenuOpen ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>

            {/* Submenú */}
            {isLogMenuOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                {logLinks.map((logLink) => (
                  <li key={logLink.id}>
                    <a
                      href="#"
                      onClick={() => {
                        setActive(logLink.id);
                        setLogMenuOpen(false); // Cerrar el menú después de seleccionar
                      }}
                      className={`flex items-center gap-4 p-2 rounded-md ${
                        active === logLink.id ? "bg-gray-600 text-white" : "text-gray-400"
                      } hover:bg-gray-600 hover:text-white transition-colors`}
                    >
                      <logLink.icon className="h-5 w-5" /> {/* Icono del log */}
                      {logLink.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
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
