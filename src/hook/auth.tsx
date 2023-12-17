'use client'
import { createUser } from '@/database/user/create-user';
import { LocalStorageKeys } from '@/lib/localStorageName';
import { User } from '@prisma/client';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type AuthType = {
  children: ReactNode
};

type SignIn = { email: string, name: string };

type AuthContextType = {
  user: User,
  signin: ({ email, name }: SignIn) => Promise<{ success: boolean, user?: User }>
}

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthType) {
  const [user, setUser] = useState<User>({} as User);

  const signin = async ({ email, name }: SignIn) => {
    const user = await createUser({
      email,
      name,
    });

    if (user.success) {
      localStorage.setItem(LocalStorageKeys.USER, JSON.stringify({ ...user.user }));
      setUser({ ...user.user! });
    }

    return user;
  }

  useEffect(() => {
    const getUserLocal = () => {
      const userLogged = localStorage.getItem(LocalStorageKeys.USER);
      if (userLogged !== null) {
        setUser(JSON.parse(userLogged))
      }
    }

    getUserLocal();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signin
      }}
    >

      {children}
    </AuthContext.Provider>
  )
};

function useAuth() {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
