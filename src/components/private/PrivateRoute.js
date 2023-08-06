import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { admin } = useSelector((state) => state.adminInfo);

  return admin?._id ? (
    children
  ) : (
    <Navigate
      to="/"
      state={{
        from: { location },
      }}
    />
  );
};
