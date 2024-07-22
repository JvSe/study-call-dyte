"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

import { getParticipantMeet } from "@/database/user/get-participant";
import { CallEnum } from "@/lib/call-enum";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/use-auth";
import { useMeet } from "@/store/use-meet";
import { Participant } from "@prisma/client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

type DialogModalProps = {
  className?: string;
};

export function DialogModal({ className }: DialogModalProps) {
  const [notifyUser, meetId] = useMeet((s) => [s.notifyUser, s.meetId]);
  const user = useAuth((s) => s.user);

  const [userFormatted, setUserFormatted] = useState({
    ...user,
    participant: {} as Participant,
  });

  const updateStatusInRoom = useCallback(async () => {
    if (meetId) {
      const participant = (
        await getParticipantMeet({ userID: user.id, meetingId: meetId })
      ).participant;

      if (participant) {
        setUserFormatted((prev) => ({
          ...prev,
          participant: participant![0],
        }));
      }
    }
  }, [user, meetId, notifyUser]);

  useEffect(() => {
    updateStatusInRoom();
  }, [updateStatusInRoom]);

  return (
    <Dialog
      open={
        userFormatted?.participant?.role_call === CallEnum.PARTICIPANT &&
        notifyUser.notify
      }
    >
      <DialogContent
        className={cn(
          "gap-12 h-screen max-h-screen overflow-y-auto md:h-auto flex flex-col ",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-text text-xl font-normal">
            Estão te esperando na chamada!
          </DialogTitle>
        </DialogHeader>
        <Link href={`/call/${meetId}`} className="w-full">
          <Button className="w-full">Entrar na chamada</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
