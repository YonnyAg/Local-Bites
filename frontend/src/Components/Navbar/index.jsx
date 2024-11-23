import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, HomeIcon, BuildingStorefrontIcon, ChatBubbleBottomCenterTextIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserIcon  } from '@heroicons/react/24/solid';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', text: 'Inicio', icon: <HomeIcon className="h-5 w-5 mr-1" />, key: 'home' },
    { path: '/locales', text: 'Locales', icon: <BuildingStorefrontIcon className="h-5 w-5 mr-1" />, key: 'locales' },
    { path: '/contacto', text: 'Contacto', icon: <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1" />, key: 'contacto' },
    ...(isAuthenticated
      ? [
          { path: '/perfil', text: 'Perfil', icon: <UserIcon className="h-5 w-5 mr-1" />, key: 'perfil' },
          { path: '/', text: 'Cerrar Sesión', icon: <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />, onClick: handleLogout, key: 'logout' },
        ]
      : [{ path: '/login', text: 'Iniciar Sesión', icon: <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />, key: 'login' }]
    ),
  ];
  

  return (
    <header className="fixed top-0 left-0 w-full bg-[#FFC600] z-50">
      <div className="max-w-[1400px] mx-auto px-5 flex justify-between items-center h-[70px]">
        {/* Logo ajustado */}
        <NavLink to="/" className="flex items-center">
          <img
            src="../../../public/logo.svg"
            alt="Logo"
            style={{ width: "100px", height: "100px" }}
            className="mr-3"
          />
          <span className="text-2xl md:text-3xl text-dark font-bold">Local Bites</span>
        </NavLink>

        {/* Navegación en pantallas grandes */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.key}
              to={link.path}
              onClick={link.onClick ? link.onClick : null} // Agrega onClick para "Cerrar Sesión"
              className={({ isActive }) => `
                flex items-center text-dark text-lg font-medium no-underline
                relative after:content-[''] after:absolute 
                after:bottom-[-4px] after:left-0 after:w-0 
                after:h-[2px] after:bg-white after:transition-all 
                after:duration-300 hover:after:w-full
                ${isActive ? 'after:w-full' : ''}
                hover:text-white
              `}
            >
              {link.icon}
              {link.text}
            </NavLink>
          ))}
        </nav>

        {/* Botón del menú para móviles */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-dark"
        >
          {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
        </button>
      </div>

      {/* Navegación desplegable en móvil */}
      <nav
        className={`md:hidden bg-[#FFC34A] overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[400px]' : 'max-h-0'}`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.key}
            to={link.path}
            onClick={() => {
              setIsMenuOpen(false);
              if (link.onClick) link.onClick();
            }}
            className={({ isActive }) => `
              flex items-center block text-dark text-lg font-medium no-underline
              py-4 px-5 border-b border-[#000000]
              ${isActive ? 'bg-[#F3CA4C]' : ''}
              hover:bg-dark hover:text-[#0e1f53] transition duration-300
            `}
          >
            {link.icon}
            {link.text}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
