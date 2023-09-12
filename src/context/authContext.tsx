"use client";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: { email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be within AuthContextProvider");
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (inputs: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/login", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(inputs),
      });
      const resJson = await res.json();
      setCurrentUser(resJson);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
