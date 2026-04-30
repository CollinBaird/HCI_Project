import React, { createContext, useContext, useState } from "react";

// Shape of a user object stored after login/register
interface User {
  name: string;
  email: string;
  orgName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  register: (email: string, name: string, orgName: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Wrap the app in this provider to give all pages access to auth state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, name: string) => {
    setUser({ email, name });
  };

  const register = (email: string, name: string, orgName: string) => {
    setUser({ email, name, orgName });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access auth state from any component
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}