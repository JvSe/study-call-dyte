import { createUser } from "@/database/user/create-user";
import { User } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User;
  signin: ({ email, name }: { email: string; name: string }) => Promise<{
    success: boolean;
    user?: User;
  }>;
}

export const useAuth = create(
  persist<AuthStore>(
    (set, get) => ({
      user: {} as User,
      signin: async ({ email, name }) => {
        const response = await createUser({
          email,
          name,
        });

        const { user } = response;

        set({ user });
        return response;
      },
    }),
    { name: "user-persisted" }
  )
);
