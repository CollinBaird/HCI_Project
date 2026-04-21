import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Venues } from "./pages/Venues";
import { Catering } from "./pages/Catering";
import { CalendarPage } from "./pages/CalendarPage";
import { Messages } from "./pages/Messages";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import { Organization } from "./pages/Organization";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "venues", Component: Venues },
      { path: "catering", Component: Catering },
      { path: "calendar", Component: CalendarPage },
      { path: "messages", Component: Messages },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "organization", Component: Organization },
    ],
  },
]);
