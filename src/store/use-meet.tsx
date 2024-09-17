import { CallEnum } from "@/lib/call-enum";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  userToken: string | null;
  meetId: string | null;
  notifyUser: {
    type: CallEnum;
    notify: boolean;
  };

  updateNotifyUser: (notify: { type: CallEnum; notify: boolean }) => void;

  addUserToken: (token: string) => void;
  addMeetId: (id: string) => void;
}

export const useMeet = create(
  persist<AuthStore>(
    (set, get) => ({
      userToken: null,
      meetId: null,
      notifyUser: {
        notify: false,
        type: CallEnum.PARTICIPANT,
      },

      updateNotifyUser: (notifyUser) =>
        set({
          notifyUser,
        }),
      addUserToken: (userToken) => set({ userToken }),
      addMeetId: (meetId) => set({ meetId }),
    }),
    { name: "@call-dyte:meet-store" }
  )
);
