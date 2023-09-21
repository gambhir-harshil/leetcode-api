"use client";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { loadState, removeState, saveState } from "@/lib/clients/localStorage";
import { API_ROUTES } from "@/lib/types/consts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { httpFetch } from "@/lib/helpers";

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
  currentUser: any;
  apiAuthenticate: (
    scope: string,
    inputs: RegisterPayloadType | LoginPayloadType
  ) => Promise<any> | undefined;
  apiLogout: () => Promise<void>;
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
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const storedUser = loadState("user");
    return storedUser ? storedUser : null;
  });
  const router = useRouter();

  useEffect(() => {
    if (currentUser !== null) {
      saveState("user", currentUser);
    } else {
      removeState("user");
    }
  }, [currentUser]);

  const apiAuthenticate = async (
    scope: string,
    inputs: RegisterPayloadType | LoginPayloadType
  ) => {
    delete (inputs as RegisterPayloadType).passwordConfirm;
    try {
      const res = await httpFetch((API_ROUTES as any)[scope], "POST", inputs);
      toast.success("Authenticated successfully!");
      setCurrentUser(res);
      router.push("/leaderboard?justAuthenticated=true");
    } catch (error: Error | any) {
      toast.error("Error Authenticating: " + error.message);
      console.error(error);
    }
  };

  const apiLogout = async () => {
    try {
      await fetch(API_ROUTES.userLogout, {
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
    <AuthContext.Provider value={{ currentUser, apiAuthenticate, apiLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
