"use client";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { loadState, removeState, saveState } from "@/lib/clients/localStorage";
import { API_ROUTES } from "@/types/consts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { httpFetch } from "@/lib/helpers";

interface User {
  email: string;
  username: string;
}

export type RegisterPayloadType = {
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

export type LoginPayloadType = {
  email: string;
  password: string;
};

interface AuthContextType {
  currentUser: User | null;
  registerUser: (inputs: RegisterPayloadType) => Promise<void>;
  login: (inputs: LoginPayloadType) => Promise<void>;
  logout: () => void;
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
    const storedUser = loadState("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const router = useRouter();

  useEffect(() => {
    if (currentUser !== null) {
      saveState("user", currentUser);
    } else {
      removeState("user");
    }
  }, [currentUser]);

  const registerUser = async (inputs: RegisterPayloadType) => {
    delete inputs.passwordConfirm;
    try {
      const res = await httpFetch(API_ROUTES.userRegister, "POST", inputs);
      toast.success("Registered successfully");
      setCurrentUser(res);
      router.push("/leaderboard");
    } catch (error: Error | any) {
      toast.error("Register error: " + error.message);
      console.error(error);
    }
  };

  const login = async (inputs: LoginPayloadType) => {
    try {
      const res = await httpFetch(API_ROUTES.userLogin, "POST", inputs);
      toast.success("Signed in successfully");
      setCurrentUser(res);
      router.push("/leaderboard");
    } catch (error: Error | any) {
      toast.error("Login error: " + error.message);
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(API_ROUTES.userLogout, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({}),
      });
      setCurrentUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
