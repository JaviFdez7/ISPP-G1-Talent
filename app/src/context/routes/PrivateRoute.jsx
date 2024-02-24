import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../authContext";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}