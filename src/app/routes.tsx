import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Venues } from "./pages/Venues";
import { Catering } from "./pages/Catering";
import { CalendarPage } from "./pages/CalendarPage";
import { Messages } from "./pages/Messages";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import { Organization } from "./pages/Organization";
import { PlanEvent } from "./pages/PlanEvent";
import { PlanEventCombined } from "./pages/PlanEventCombined";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { RouteError } from "./pages/RouteError";

export const router = createBrowserRouter([
  // Redirect root to login by default
  { path: "/", element: <Navigate to="/login" replace />, errorElement: <RouteError /> },

  // Auth pages — outside Layout so no sidebar is shown
  { path: "/login", Component: Login, errorElement: <RouteError /> },
  { path: "/register", Component: Register, errorElement: <RouteError /> },

  // Main app — inside Layout so sidebar is shown
  {
    path: "/home",
    Component: Layout,
    errorElement: <RouteError />,
    children: [
      { index: true, Component: Home },
      { path: "venues", Component: Venues },
      { path: "catering", Component: Catering },
      { path: "plan-event", Component: PlanEvent },
      { path: "plan-event/combined", Component: PlanEventCombined },
      { path: "calendar", Component: CalendarPage },
      { path: "messages", Component: Messages },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "organization", Component: Organization },
    ],
  },
  // Catch unknown URLs so users do not land on the default router crash screen.
  { path: "*", element: <Navigate to="/login" replace /> },
]);