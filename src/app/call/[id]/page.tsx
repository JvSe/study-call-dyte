"use client";
import { Spinner } from "@/components/ui/spinner";
import { getParticipantMeet } from "@/database/user/get-participant";
import { useAuth } from "@/store/use-auth";
import { useMeet } from "@/store/use-meet";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import Facetime from "../../../components/video-call/screens";

export default function Call({ params }: { params: { id: string } }) {
  const [client, initMeeting] = useDyteClient();
  const user = useAuth((s) => s.user);
  const [addMeetID, addUserToken] = useMeet((s) => [
    s.addMeetId,
    s.addUserToken,
  ]);
  const { id } = useParams<{ id: string }>();

  const handleGetTokenParticipant = useCallback(async () => {
    if (user.id) {
      const { success, participant } = await getParticipantMeet({
        meetingId: id,
        userID: user.id,
      });

      if (success) {
        addUserToken(participant![0].user_token);
        alert(participant![0].user_token);
      }
    }
  }, [user]);

  useEffect(() => {
    handleGetTokenParticipant();
  }, [handleGetTokenParticipant, user]);

  useEffect(() => {
    addMeetID(id);
  }, []);

  // useEffect(() => {
  //   if (token !== null && token.length > 5) {
  //     initMeeting({
  //       authToken: token,
  //       defaults: {
  //         audio: false,
  //         video: false,
  //       },
  //     }).then((m) => m?.joinRoom());
  //   }
  // }, [token]);

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
