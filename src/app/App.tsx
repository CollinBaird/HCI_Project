import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    // AuthProvider wraps everything so all pages can access login/register/logout state
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}