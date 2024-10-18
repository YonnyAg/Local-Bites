import { useState } from 'react';
import Layout from "../../Components/Layout";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Para manejar el estado de sesión
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setErrorMessage(''); // Limpiar cualquier mensaje de error
        console.log('Inicio de sesión exitoso');
      } else {
        const data = await response.json();
        setErrorMessage(data.error);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      setErrorMessage('Error en la conexión con el servidor');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
