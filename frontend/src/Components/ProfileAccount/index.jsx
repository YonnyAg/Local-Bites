import React, { useEffect, useState } from "react";
import './ProfileAccount.css';
import UserReviews from "./UserReviews/UserReviews";

const UserAccount = () => {
  const [userData, setUserData] = useState(null); // Estado para almacenar datos del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga

  // Función para refrescar el token de acceso
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        const response = await fetch("https://local-bites-backend.onrender.com/api/token/refresh/", {
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
      let token = localStorage.getItem("accessToken"); // Obtén el token de acceso desde localStorage

      let response = await fetch("https://local-bites-backend.onrender.com/api/api/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en las cabeceras
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) { // Si el token ha expirado
        token = await refreshAccessToken(); // Intenta refrescar el token
        if (token) {
          response = await fetch("https://local-bites-backend.onrender.com/api/api/profile/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Incluye el nuevo token
              "Content-Type": "application/json",
            },
          });
        }
      }

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Guarda los datos del usuario
      } else {
        console.error("Error fetching profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Mostrar indicador de carga mientras se obtienen los datos
  if (loading) {
    return <p>Loading...</p>;
  }

  // Manejar el caso donde no se cargaron datos correctamente
  if (!userData) {
    return <p>Error loading user data.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Encabezado */}
      <div
        className="relative h-40 bg-center bg-contain border-4 border-black banner-css"
        style={{
          backgroundImage: "url('/src/assets/Profile/banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-black">
              <img
                src={userData.profilePicture || "https://via.placeholder.com/150"} // Imagen de perfil del usuario
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Información del usuario */}
      <div className="text-center mt-16">
        <h1 className="text-2xl text-neutral-950 font-bold">{userData.username}</h1>
        <p className="text-gray-600">{userData.email}</p>
        <p className="text-gray-600">{userData.location}</p>
      </div>

      {/* Actividad */}
      <UserReviews />
    </div>
  );
};

export default UserAccount;
