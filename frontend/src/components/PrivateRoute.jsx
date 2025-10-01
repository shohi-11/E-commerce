import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (!token) {
    return <Navigate to="/login" />; // redirect to login if not logged in
  }

  return children; // render the protected page
}

export default PrivateRoute;