"use client";
import { Spinner } from "@/components/ui/spinner";
import { addUserMeet } from "@/database/meet/add-participants";
import { getMeet } from "@/database/meet/get-meet";
import { getParticipantMeet } from "@/database/user/get-participant";
import { updateParticipant } from "@/database/user/update-participant";
import { useSupabase } from "@/hook/use-supabase";
import { CallEnum } from "@/lib/call-enum";
import { useAuth } from "@/store/use-auth";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { useCallback, useEffect, useState } from "react";
import Facetime from "../components/Facetime";

export default function Call({ params }: { params: { id: string } }) {
  const [client, initMeeting] = useDyteClient();
  const user = useAuth((s) => s.user);

  const [token, setToken] = useState<string | null>(null);

  const { roomIsAlready } = useSupabase();

  const updateStatusInRoom = useCallback(async () => {
    const participant = (
      await getParticipantMeet({ userID: user.id, meetingId: params.id })
    ).participant;

    if (!participant![0].in_room) {
      await updateParticipant({
        ...participant![0],
        in_room: true,
      });
    }
    setToken(participant![0].user_token);
  }, [user, params, roomIsAlready]);

  const addUsersOnMeeting = async () => {
    const idMeet = params.id;
    const participants = (await getMeet(idMeet)).meet?.participants;

    await Promise.all(
      participants!.map(async (participant) => {
        await addUserMeet({
          user: participant.user,
          idParticipant: participant.id,
          idMeet: idMeet,
          type_preset: participant.role_call as CallEnum,
        });
      })
    );
  };

  useEffect(() => {
    addUsersOnMeeting();
  }, []);

  useEffect(() => {
    if (roomIsAlready) updateStatusInRoom();
  }, [updateStatusInRoom, roomIsAlready]);

  useEffect(() => {
    console.log("token =>", token);
    if (token !== null && token.length > 5) {
      initMeeting({
        authToken: token,
        defaults: {
          audio: false,
          video: false,
        },
      }).then((m) => m?.joinRoom());
    }
  }, [token]);

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
