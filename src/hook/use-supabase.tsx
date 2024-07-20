"use client";

import { useAuth } from "@/store/use-auth";
import { User } from "@prisma/client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const useSupabase = () => {
  const [userAuth] = useAuth((s) => [s.user]);
  const [users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    // Fetch initial logged in users
    async function fetchLoggedInUsers() {
      if (userAuth.id !== undefined) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .neq("id", userAuth.id)
          .eq("online", true);

        if (error) {
          console.error("Error fetching logged in users:", error);
        } else {
          setUsers(data);
        }
      }
    }

    fetchLoggedInUsers();

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
        (payload) => setUsers((prev) => [...prev, payload.new as User])
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
