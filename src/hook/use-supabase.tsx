"use client";

import { getUsers } from "@/database/user/get-user";
import { useAuth } from "@/store/use-auth";
import { Participant, User } from "@prisma/client";
import { useEffect, useState } from "react";

import { CallEnum } from "@/lib/call-enum";
import { useMeet } from "@/store/use-meet";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const useSupabase = () => {
  const [userAuth] = useAuth((s) => [s.user]);
  const [users, setUsers] = useState<User[]>([] as User[]);
  const [roomIsAlready, setRoomIsAlready] = useState<boolean>(false);

  const [addMeetId, notifyUser, addUserToken] = useMeet((s) => [
    s.addMeetId,
    s.updateNotifyUser,
    s.addUserToken,
  ]);

  useEffect(() => {
    // Fetch initial logged in users
    const fetchOnlineUsers = async () => {
      if (userAuth.id !== undefined) {
        const response = await getUsers(userAuth.id);
        setUsers(response.users);
      }
    };

    fetchOnlineUsers();
  }, [userAuth]);

  useEffect(() => {
    // Set up real-time subscription
    const subscription = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
        },
        (payload) => {
          const userUpdated = payload.new as User;
          if (userUpdated.online) {
            setUsers((prev) => [...prev, payload.new as User]);
          } else {
            setUsers((prev) => prev.filter((u) => u.id !== userUpdated.id));
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "participants",
        },
        (payload) => {
          const participant = payload.new as Participant;

          if (participant.role_call == CallEnum.HOST) {
            notifyUser({
              notify: true,
              type: CallEnum.PARTICIPANT,
            });
            addMeetId(participant.meeting_id);
          }

          if (
            participant.user_token !== null &&
            participant.user_token.length > 5
          )
            setRoomIsAlready(true);
        }
      )
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userAuth]);

  return {
    users,
    supabase,
    roomIsAlready,
  };
};
