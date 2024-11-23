import React from "react";
import './ProfileAccount.css'
import UserReviews from "./UserReviews/UserReviews";

const UserAccount = () => {
  // Datos estáticos para pruebas
  const userData = {
    profilePicture: "https://via.placeholder.com/150", // URL de ejemplo para la foto de perfil
    username: "Jitu Chauhan", // Nombre de usuario
    email: "usuario@gmail.com", // Nombre de usuario para redes
    location: "Lanco, Chile", // Localidad del usuario
  };

  const activities = [
    {
      date: "Today",
      items: [
        { text: "You created a task for Development in Front End Developer Team", type: "task" },
        { text: "Watched a YouTube video on Next.js Development", type: "video" },
        { text: "Commented on Front End Development project of DashUI", type: "comment" },
      ],
    },
    {
      date: "20 April 2023",
      items: [
        { text: "Added new team member Jhon Doe to UI/UX Design Team", type: "team" },
        { text: "Moved all upcoming changes in Review Column for testing", type: "review" },
      ],
    },
  ];

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
                        src="https://via.placeholder.com/150"
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>


      <div className="text-center mt-16">
        <h1 className="text-2xl text-neutral-950 font-bold">{userData.username}</h1>
        <p className="text-gray-600">{userData.email}</p>
      </div>

      {/* Actividad */}
      <UserReviews />
    </div>
  );
};

export default UserAccount;
