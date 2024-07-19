/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { UserI } from "../interfaces/User";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  userData: UserI | null;
  login: (token: string, user: UserI) => void;
  logout: () => void;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserI | null>(null);
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUserData(user);
    }
  }, []);

  const login = (token: string, user: UserI) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUserData(user);
    nav(user.role === "admin" ? "/admin" : "/");
  };

  const logout = () => {
    if (confirm("Logout?")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUserData(null);
      nav("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ userData, login, logout, isAdmin: userData?.role === "admin" }}
    >
      {children}
    </AuthContext.Provider>
  );
};
