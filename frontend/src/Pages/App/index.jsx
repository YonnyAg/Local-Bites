// src/Pages/App/index.jsx
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext'; // Importa el AuthProvider
import Premises from '../Premises';
import Contact from '../Contact';
import Login from '../Login';
import ProfileRestaurant from '../ProfileRestaurant'
import Profile from '../ProfileAccount'
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Home from '../Home';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/locales', element: <Premises /> },
    { path: '/contacto', element: <Contact /> },
    { path: '/login', element: <Login /> },
    { path: '/perfil', element: <Profile /> },
    { path: '/restaurante/:id', element: <ProfileRestaurant /> },
  ]);

  return routes;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
