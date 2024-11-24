// src/Pages/App/index.jsx
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext'; // Importa el AuthProvider
import Premises from '../Premises';
import Contact from '../Contact';
import Login from '../Login';
import ProfileRestaurant from '../ProfileRestaurant';
import Profile from '../ProfileAccount';
import AdminPanel from '../Admin';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Home from '../Home';
import './App.css';

// Define las rutas en un componente separado
const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/locales', element: <Premises /> },
    { path: '/contacto', element: <Contact /> },
    { path: '/login', element: <Login /> },
    { path: '/perfil', element: <Profile /> },
    {
      path: '/adminpanel/*', // Añade un asterisco para indicar subrutas
      element: <AdminPanel />,
    },
    { path: '/restaurante/:id', element: <ProfileRestaurant /> },
  ]);

  return routes;
};

// Configuración principal de la aplicación
function App() {
  return (
    <AuthProvider>
      {/* Declaración única de BrowserRouter */}
      <BrowserRouter>
        <Navbar /> {/* Barra de navegación */}
        <AppRoutes /> {/* Rutas de la aplicación */}
        <Footer /> {/* Pie de página */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
