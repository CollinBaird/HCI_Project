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
import { PlanEvent } from "./pages/PlanEvent";
import { PlanEventCombined } from "./pages/PlanEventCombined";

// Central route map for the app. All pages render inside Layout.
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      // Home/dashboard
      { index: true, Component: Home },

      // Booking flows
      { path: "venues", Component: Venues },
      { path: "catering", Component: Catering },
      { path: "plan-event", Component: PlanEvent },
      { path: "plan-event/combined", Component: PlanEventCombined },

      // Management/communication pages
      { path: "calendar", Component: CalendarPage },
      { path: "messages", Component: Messages },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "organization", Component: Organization },
    ],
  },
]);
