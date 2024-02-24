import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthContext();

  let navigate = useNavigate();

  return (
    <header className="text-white body-font bg-blue-800">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Bloque TALENT */}
        <div className="mb-4 md:mb-0">
          <span className="mr-5 text-gray-500 cursor-not-allowed ">TALENT</span>
        </div>
        {/* Navegación con Inicio */}
        <Link to="/" className="flex title-font font-medium items-center">
          <span className="ml-3 text-xl">About us</span>
        </Link>
        <button className="ml-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Configuración
        </button>
        <button className="ml-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Informacion
        </button>
      </div>
    </header>
  );
}
