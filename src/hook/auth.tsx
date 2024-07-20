"use client";
import { createUser } from "@/database/user/create-user";
import { User } from "@prisma/client";
import { ReactNode, createContext, useContext, useState } from "react";

type AuthType = {
  children: ReactNode;
};

type SignIn = { email: string; name: string };

type AuthContextType = {
  user: User;
  signin: ({
    email,
    name,
  }: SignIn) => Promise<{ success: boolean; user?: User }>;
};

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthType) {
  const [user, setUser] = useState<User>({} as User);

  const signin = async ({ email, name }: SignIn) => {
    const user = await createUser({
      email,
      name,
    });
    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
