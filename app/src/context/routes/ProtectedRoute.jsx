import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../authContext";

export default function ProtectedRoute() {
    const { isAuthenticated, isCandidate, isRepresentative } = useAuthContext();

    if (!isAuthenticated  /*localStorage.getItem("role") !== "captain"*/
        ) {
        return <Navigate to={"/"} />;
      }

    return (
        <div>
          <Outlet />
        </div>
      )
}