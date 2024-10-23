import React, { useState } from 'react';
import './estiloform.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='Box-login-css'>
    <div className={`wrapper ${!isLogin ? 'active' : ''}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      {/* Formulario de Iniciar Sesión */}
      <div className="form-box login">
        <h1 className="title animation" style={{ color: '#000', '--i': 0, '--j': 21 }}>
          Iniciar Sesión
        </h1>
        <form>
          <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
            <input type="text" required />
            <label>Nombre de Usuario</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
            <input type="password" required />
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
          ¡Bienvenido!
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
        <form>
          <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
            <input type="text" required />
            <label>Nombre de Usuario</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
            <input type="email" required />
            <label>Email</label>
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
            <input type="password" required />
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
          Bienvenido Nuevamente
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
