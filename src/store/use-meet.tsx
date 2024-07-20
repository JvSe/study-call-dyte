import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  userToken: string;
  meetId: string;

  addUserToken: (token: string) => void;
  addMeetId: (id: string) => void;
}

export const useAuth = create(
  persist<AuthStore>(
    (set, get) => ({
      userToken: "",
      meetId: "",
      addUserToken: (userToken) => set({ userToken }),
      addMeetId: (meetId) => set({ meetId }),
    }),
    { name: "call-persisted" }
  )
);
