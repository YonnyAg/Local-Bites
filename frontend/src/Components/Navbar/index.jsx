import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../../context/AuthContext'; // Importa el contexto de autenticación

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext); // Obtiene el estado y las funciones del contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama a la función logout del contexto
    navigate('/'); // Redirige a la página de inicio después de cerrar sesión
  };

  const navLinks = [
    { path: '/', text: 'Inicio' },
    { path: '/locales', text: 'Locales' },
    { path: '/contacto', text: 'Contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0404e2] z-50">
      <div className="max-w-[1400px] mx-auto px-5 flex justify-between items-center h-[70px]">
        <NavLink to="/" className="text-2xl md:text-3xl text-white font-bold no-underline">
          LocalBites
        </NavLink>

        {/* Navegación en pantallas grandes */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                text-white text-lg font-medium no-underline
                relative after:content-[''] after:absolute 
                after:bottom-[-4px] after:left-0 after:w-0 
                after:h-[2px] after:bg-white after:transition-all 
                after:duration-300 hover:after:w-full
                ${isActive ? 'after:w-full' : ''}
              `}
            >
              {link.text}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-white text-lg font-medium no-underline">
              Cerrar Sesión
            </button>
          ) : (
            <NavLink to="/login" className="text-white text-lg font-medium no-underline">
              Iniciar Sesión
            </NavLink>
          )}
        </nav>

        {/* Botón del menú para móviles */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
        </button>
      </div>

      {/* Navegación desplegable en móvil */}
      <nav
        className={`
          md:hidden bg-[#0e1f53] overflow-hidden transition-all duration-300
          ${isMenuOpen ? 'max-h-[400px]' : 'max-h-0'}
        `}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `
              block text-white text-lg font-medium no-underline
              py-4 px-5 border-b border-[#ffffff]
              ${isActive ? 'bg-[#0e1f53]' : ''}
            `}
          >
            {link.text}
          </NavLink>
        ))}
        {isAuthenticated ? (
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="block text-white text-lg font-medium no-underline py-4 px-5 border-b border-[#ffffff]"
          >
            Cerrar Sesión
          </button>
        ) : (
          <NavLink
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white text-lg font-medium no-underline py-4 px-5 border-b border-[#ffffff]"
          >
            Iniciar Sesión
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
