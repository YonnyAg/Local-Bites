import React, { useEffect, useState } from 'react';
import './ErrorNotification.css';

const ErrorNotification = ({ visible }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [startFadeOut, setStartFadeOut] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setStartFadeOut(false);

      // Temporizador para mantener el mensaje visible durante 3 segundos antes de iniciar la animación de salida
      const timer = setTimeout(() => {
        setStartFadeOut(true); // Inicia la animación de salida
      }, 3000);

      // Temporizador para ocultar el mensaje después de la animación de salida
      const fadeOutTimer = setTimeout(() => {
        setIsVisible(false);
        setStartFadeOut(false); // Reinicia el estado de salida
      }, 3800); // 3000ms + 800ms de la animación de salida

      return () => {
        clearTimeout(timer);
        clearTimeout(fadeOutTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, [visible]);

  return isVisible ? (
    <div className={`error-notification ${startFadeOut ? 'fade-out' : ''}`}>
      <span className="error-icon">✖️</span>
      <span>Error al Ingresar datos</span>
    </div>
  ) : null;
};

export default ErrorNotification;
