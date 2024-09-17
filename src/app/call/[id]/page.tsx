"use client";
import { Spinner } from "@/components/ui/spinner";
import { VideoCallCore } from "@/components/video-call/core";
import { addUserMeet } from "@/database/meet/add-participants";
import { getParticipantMeet } from "@/database/user/get-participant";
import { useSupabase } from "@/hook/use-supabase";
import { CallEnum } from "@/lib/call-enum";
import { useAuth } from "@/store/use-auth";
import { useMeet } from "@/store/use-meet";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Call({ params }: { params: { id: string } }) {
  const [client, initMeeting] = useDyteClient();
  const user = useAuth((s) => s.user);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [initRoom, setInitRoom] = useState(false);

  const [addMeetID] = useMeet((s) => [s.addMeetId]);
  const { id } = useParams<{ id: string }>();

  const { meet } = useSupabase();

  console.log(meet);

  const handleGetTokenParticipant = useCallback(async () => {
    if (user.id && userToken === null) {
      addMeetID(id);
      const { success, participant } = await getParticipantMeet({
        meetingId: id,
        userID: user.id,
      });

      if (success) {
        const response = await addUserMeet({
          idMeet: id,
          idParticipant: participant!.id,
          type_preset: CallEnum.HOST,
          user,
        });

        const { success, data } = response;

        if (success) setUserToken(data.token);
      }
    }
  }, [user]);

  useEffect(() => {
    handleGetTokenParticipant();
  }, [handleGetTokenParticipant, user, userToken]);

  useEffect(() => {
    addMeetID(id);
  }, []);

  useEffect(() => {
    if (userToken !== null && meet.ready && !initRoom) {
      console.log("salve");
      setInitRoom(true);
      initMeeting({
        authToken: userToken,
        defaults: {
          audio: false,
          video: false,
        },
      }).then((m) => m?.joinRoom());
    }
  }, [userToken]);

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
        <VideoCallCore />
      </div>
    </DyteProvider>
  );
}
