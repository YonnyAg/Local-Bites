import React, { useEffect } from 'react';
import Form from '../../Components/FormLogin'; // Asegúrate de la ruta correcta para el Form.
import logVisit from '../../Components/LogVisit';

const Login = () => {
  useEffect(() => {
    logVisit(); // Llama a logVisit al cargar la página
  }, []); // [] asegura que solo se ejecuta una vez

  return (
    <Form />
  );
};

export default Login;
