import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicRoute() {
  return (
    <div>
      <Outlet />
    </div>
  );
}