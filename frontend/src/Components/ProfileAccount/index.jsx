import React, { useEffect, useState } from "react";
import './ProfileAccount.css';
import UserReviews from "./UserReviews/UserReviews";

const UserAccount = () => {
  const [userData, setUserData] = useState(null); // Estado para almacenar datos del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga
  const [editing, setEditing] = useState(false); // Estado para controlar el modo edición
  const [newUsername, setNewUsername] = useState(""); // Nuevo nombre de usuario
  const [newProfilePicture, setNewProfilePicture] = useState(null); // Nueva imagen de perfil

  // Variable de entorno para la URL base del servidor
  const SERVER_URL = 'http://127.0.0.1:8000/api';

  // Función para refrescar el token de acceso
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await fetch(`${SERVER_URL}/token/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.access); // Actualiza el token de acceso
          return data.access;
        } else {
          console.error("Failed to refresh access token");
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    }

    return null; // Si no hay token válido
  };

  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    try {
      let token = localStorage.getItem("accessToken");

      let response = await fetch(`${SERVER_URL}/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        token = await refreshAccessToken();
        if (token) {
          response = await fetch(`${SERVER_URL}/profile/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      }

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setNewUsername(data.username); // Inicializa el nombre para edición
      } else {
        console.error("Error fetching profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la actualización de perfil
  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
  
      const formData = new FormData();
      formData.append("username", newUsername);
      if (newProfilePicture) {
        formData.append("profilePicture", newProfilePicture);
      }
  
      const response = await fetch(`${SERVER_URL}/profile/update/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Autorización con el token de acceso
        },
        body: formData,
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData); // Actualiza los datos en el estado
        setEditing(false); // Cierra el modal de edición
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>Error loading user data.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative h-40 bg-center bg-contain border-4 border-black banner-css"
        style={{
          backgroundImage: "url('/src/assets/Profile/banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 flex items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-black">
              <img
                src={userData.profilePicture || "https://via.placeholder.com/150"}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <h1 className="text-2xl text-neutral-950 font-bold flex justify-center items-center">
          {userData.username}
          <button
            onClick={() => setEditing(true)}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            ✏️ {/* Ícono de lápiz */}
          </button>
        </h1>
        <p className="text-gray-600">{userData.email}</p>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg z-60">
            <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="file"
              onChange={(e) => setNewProfilePicture(e.target.files[0])}
              className="block w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={updateProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


      <UserReviews />
    </div>
  );
};

export default UserAccount;
