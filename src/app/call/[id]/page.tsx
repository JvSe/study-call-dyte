"use client";
import { Spinner } from "@/components/ui/spinner";
import { getParticipantMeet } from "@/database/user/get-participant";
import { updateParticipant } from "@/database/user/update-participant";
import { useAuth } from "@/store/use-auth";
import { useMeet } from "@/store/use-meet";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { useCallback, useEffect } from "react";
import Facetime from "../components/Facetime";

export default function Call({ params }: { params: { id: string } }) {
  const [client, initMeeting] = useDyteClient();
  const user = useAuth((s) => s.user);

  const [token, addMeetId, notifyUser] = useMeet((s) => [
    s.userToken,
    s.addMeetId,
    s.updateNotifyUser,
  ]);

  console.log("token =>", token);

  const updateStatusInRoom = useCallback(async () => {
    const participant = (
      await getParticipantMeet({ userID: user.id, meetingId: params.id })
    ).participant;

    const participantInRoom = await updateParticipant({
      ...participant![0],
      in_room: true,
    });
  }, [user, params]);

  useEffect(() => {
    updateStatusInRoom();
  }, []);

  useEffect(() => {
    if (token !== null) {
      initMeeting({
        authToken: token,
        defaults: {
          audio: true,
          video: true,
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
