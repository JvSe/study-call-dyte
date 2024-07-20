import { createUser } from "@/database/user/create-user";
import { updateUsers } from "@/database/user/update-user";
import { User } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User;
  signin: ({ email, name }: { email: string; name: string }) => Promise<{
    success: boolean;
    user?: User;
  }>;

  signout: () => Promise<void>;
}

const initialState = {
  user: {} as User,
};

export const useAuth = create(
  persist<AuthStore>(
    (set, get) => ({
      ...initialState,
      signin: async ({ email, name }) => {
        const response = await createUser({
          email,
          name,
        });

        const { user } = response;

        set({ user });
        return response;
      },

      signout: async () => {
        const response = await updateUsers(get().user);

        if (response.success) {
          set({ user: {} as User });
        }
      },
    }),
    { name: "user-persisted" }
  )
);
