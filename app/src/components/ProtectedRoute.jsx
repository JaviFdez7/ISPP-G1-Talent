import React, { useEffect, useState } from "react";
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

import axios from "axios"


export default function ProtectedRoute({ children, roles }) {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          if (isAuthenticated) {
            const currentUserId = localStorage.getItem("userId");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`);
            const user = response.data.find(user => user._id === currentUserId);
  
            if (!roles.includes(user.role)) {
              // Si el usuario no tiene el rol correcto, redirige a una página de inicio
              navigate("/");
              
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }, [isAuthenticated, navigate, roles]);
  
    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      return <Navigate to="/login" />;
    }
  
    // Si el usuario está autenticado y tiene el rol correcto, renderiza el componente de la ruta
    return children;
  }

