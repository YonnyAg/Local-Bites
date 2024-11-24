import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import SuccessNotification from './SuccessNotification';
import ErrorNotification from './ErrorNotification';
import Loader from '../Loaders/LoaderLogin';
import './FormLogin.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Contexto de autenticación

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPassword('');
    setError(null);
  };

  const goToLogin = () => {
    setIsLogin(true);
    setShowSuccess(false);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const validateEmail = (email) => {
    return /^[\w-\.]+@gmail\.(com|cl)$/.test(email);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError('Correo inválido. Debe ser @gmail.com o @gmail.cl');
      setShowError(true);
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      setShowError(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setUsername('');
        setEmail('');
        setPassword('');
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Error al registrar el usuario');
        setShowError(true);
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/api/token/', { // URL actualizada
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Guardar tokens y estado de superusuario
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
  
        // Llamar a la función de login en el contexto
        login(data.access, data.isSuperUser);
  
        setUsername('');
        setPassword('');
        setError(null);
        setShowError(false);
  
        setTimeout(() => {
          setIsLoading(false);
          navigate('/');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Error al iniciar sesión');
        setShowError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      setShowError(true);
      setIsLoading(false);
    }
  };  

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div className="Box-login-css">
      {isLoading && <Loader />}
      <SuccessNotification visible={showSuccess} onClose={() => setShowSuccess(false)} goToLogin={goToLogin} />
      <ErrorNotification visible={showError} onClose={() => setShowError(false)} />

      <div className={`wrapper ${!isLogin ? 'active' : ''}`}>
        <span className="rotate-bg"></span>
        <span className="rotate-bg2"></span>

        {/* Formulario de Iniciar Sesión */}
        <div className="form-box login">
          <h1 className="title animation" style={{ color: '#000', '--i': 0, '--j': 21 }}>
            Iniciar Sesión
          </h1>
          <form onSubmit={handleLogin}>
            <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
              <input
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Correo electrónico</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Contraseña</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>
              Iniciar Sesión
            </button>
            <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
              <p>
                ¿Aún no tienes cuenta?{' '}
                <a href="#" className="register-link" onClick={toggleForm}>
                  Regístrate
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Información de "Bienvenido" */}
        <div className="info-text login">
          <h1 className="animation" style={{ '--i': 0, '--j': 20 }}>
            ¡Bienvenido/a!
          </h1>
          <p className="animation" style={{ '--i': 1, '--j': 21 }}>
            Inicia Sesión o Regístrate para obtener descuentos con la aplicación.
          </p>
        </div>

        {/* Formulario de Registro */}
        <div className="form-box register">
          <h1 className="title animation" style={{ color: '#000', '--i': 17, '--j': 0, marginLeft: '100px' }}>
            Regístrate
          </h1>
          <form onSubmit={handleRegister}>
            <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Nombre de Usuario</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Contraseña</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 }}>
              Registrarme
            </button>
            <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
              <p>
                ¿Ya tienes una cuenta?{' '}
                <a href="#" className="login-link" onClick={toggleForm}>
                  Inicia Sesión
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Información de "Bienvenido Nuevamente" */}
        <div className="info-text register">
          <h1 className="animation" style={{ '--i': 17, '--j': 0 }}>
            Bienvenido/a Nuevamente
          </h1>
          <p className="animation" style={{ '--i': 18, '--j': 1 }}>
            Al continuar, aceptas nuestros términos de uso y política de privacidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
