import { Outlet, NavLink } from "react-router";
import { Home, MapPin, Utensils, Calendar, MessageSquare, Settings, User } from "lucide-react";

export function Layout() {
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/venues", label: "Venues", icon: MapPin },
    { path: "/catering", label: "Catering", icon: Utensils },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/messages", label: "Messages", icon: MessageSquare },
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d1f51] border-r border-blue-900 text-white flex flex-col">
        <div className="p-6 border-b border-blue-900">
          <h1 className="text-2xl font-bold text-white">UPlan</h1>
          <p className="text-sm text-blue-200 mt-1">Plan your perfect event</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-[#0d1f51]"
                      : "text-white hover:bg-blue-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
