"use client";

import { getUsers } from "@/database/user/get-user";
import { useAuth } from "@/store/use-auth";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

import { useMeet } from "@/store/use-meet";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const useSupabase = () => {
  const [userAuth] = useAuth((s) => [s.user]);
  const [users, setUsers] = useState<User[]>([] as User[]);

  const [meetId, addMeetId, notifyUser, addUserToken] = useMeet((s) => [
    s.meetId,
    s.addMeetId,
    s.updateNotifyUser,
    s.addUserToken,
  ]);

  useEffect(() => {
    // Fetch initial logged in users
    const fetchOnlineUsers = async () => {
      if (userAuth.id !== undefined) {
        const response = await getUsers(userAuth.id);
        console.log(response);
        setUsers(response.users);
      }
    };

    fetchOnlineUsers();
  }, [userAuth]);

  useEffect(() => {
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
          console.log(userUpdated);
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
          event: "*",
          schema: "public",
          table: "meetings",
          filter: `id=eq.${meetId}`,
        },
        (payload) => {
          console.log("meeting", payload.new);
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
  };
};
