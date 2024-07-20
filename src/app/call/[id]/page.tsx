"use client";
import { Spinner } from "@/components/ui/spinner";
import { useMeet } from "@/hook/meet";
import { useAuth } from "@/store/use-auth";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { useEffect, useState } from "react";
import Facetime from "../components/Facetime";

export default function Call({ params }: { params: { id: string } }) {
  const [client, initMeeting] = useDyteClient();
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuth((s) => s.user);

  const { userToken } = useMeet();

  useEffect(() => {
    if (userToken !== undefined) {
      initMeeting({
        authToken: userToken,
        defaults: {
          audio: true,
          video: true,
        },
      }).then((m) => m?.joinRoom());
    }
  }, [userToken]);

  useEffect(() => {
    if (user.email === undefined) {
      setIsOpen(true);
    }
  }, [user]);

  return (
    <DyteProvider
      value={client}
      fallback={
        <div className="flex flex-col gap-2 bg-[#633482] w-screen h-screen items-center justify-center">
          <Spinner className="" />
          <p className="text-white">Loading...</p>
        </div>
      }
    >
      <div className="w-screen h-screen">
        <Facetime />
      </div>
    </DyteProvider>
  );
}
