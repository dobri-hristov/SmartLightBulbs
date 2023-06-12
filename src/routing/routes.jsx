import React from "react";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Devices from "../pages/Devices";
import Device from "../pages/Device";
import { Navigate } from "react-router-dom";

export const publicRoutes = [
  {
    path: "/",
    element: Home,
  },

  {
    path: "/login",
    element: Auth,
  },
  {
    path: "/devices",
    element: Devices,
    title: "My Devices",
  },
].map((router) => ({
  ...router,
  element: <router.element pageStyle="p-5 page" title={router.title} />,
}));

export const privateRoutes = [
  {
    path: "/devices/:name",
    element: Device,
    title: "Device",
  },
].map((router) => ({
  ...router,
  element: <router.element pageStyle="p-5 page" title={router.title} />,
}));

export const ProtectedRoute = ({ isAuth, children }) => {
  return !isAuth ? <Navigate to="/login" replace /> : children;
};
