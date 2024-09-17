"use client";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/package/nextmed-themes/components/ui";
import { IconsNextMed } from "@/package/nextmed-themes/icons";
import { useAuthUser } from "@/store/use-authenticated-user.store";

import { PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";

import { FirebaseReferral } from "@/package/external/firebase/models/referral.firebase";
import { useFirebase } from "@/package/hooks/use-firebase";

type CallModalProps = PropsWithChildren & {
  className?: string;
};

export const CallModal = ({ className }: CallModalProps) => {
  const user = useAuthUser((s) => s.user);
  const { onMeetRequested } = useFirebase();
  const [inMeet, setInMeet] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verifica no localStorage se o modal já foi fechado antes
    const modalClosed = localStorage.getItem("@nextmed:call-modal-closed");
    // Se a propriedade "active" for true e o modal não foi fechado antes, abre o modal
    if (inMeet && !modalClosed) {
      setIsOpen(true);
    }
  }, [inMeet]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("@nextmed:call-modal-closed", "true"); // Marca o modal como fechado
  };

  const [referral, setReferral] = useState<FirebaseReferral>(
    {} as FirebaseReferral
  );

  const getReferralOnMeet = useCallback(async () => {
    const referralOnMeet = await onMeetRequested(user?.id || "");

    setReferral(referralOnMeet);
  }, [onMeetRequested, user]);

  useEffect(() => {
    getReferralOnMeet();
  }, [getReferralOnMeet]);

  const IS_USER_SPECIALIST = user && user.id == referral?.specialist?.id;

  const anotherDoctor = IS_USER_SPECIALIST
    ? referral?.requester
    : referral?.specialist;

  useEffect(() => {
    if (!anotherDoctor) return;

    if (!referral?.meeting?.ready && anotherDoctor?.inMeeting) {
      setInMeet(true);
    }
  }, [anotherDoctor, referral]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTitle className="sr-only">Chamada em andamento</DialogTitle>
      <DialogDescription className="sr-only">
        O {IS_USER_SPECIALIST ? "solicitante" : "especialista"} está pronto para
        iniciar uma videochamada com você.
      </DialogDescription>
      <DialogContent
        onEscapeKeyDown={() => {}}
        onPointerDownOutside={() => {}}
        onInteractOutside={() => {}}
        hasHelpNavigation
        className="min-w-[700px] rounded-3xl bg-[#F5F5F5] md:bg-white border-2 border-white py-14 dark:bg-dark-background dark:border-dark-border"
      >
        <div className="flex flex-col gap-2 items-center justify-center mt-2">
          <div className="flex relative">
            <Image
              src="/app/doctor-introduction-hello.svg"
              width={200}
              height={200}
              alt="Doctor Introduction"
              className="w-[113px] -scale-x-100"
            />

            <div className="absolute top-10 -right-14 ">
              <div className="relative flex items-center justify-center w-[57px] h-[57px]">
                <IconsNextMed name="cam" />

                <div
                  data-activate={true}
                  className="absolute data-[activate=true]:animate-ping-slow w-full h-full rounded-full data-[activate=true]:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-primary dark:data-[activate=true]:bg-dark-background dark:data-[activate=true]:border-2 dark:data-[activate=true]:border-primary opacity-50"
                />
              </div>
            </div>
          </div>
          <p className="font-sf-pro-display font-bold text-3xl">
            Chamada em andamento
          </p>

          <p className="font-sf-pro-display text-lg">
            O {IS_USER_SPECIALIST ? "solicitante" : "especialista"} está pronto
            para iniciar uma videochamada com você.
          </p>
          <div className="flex flex-row-reverse  gap-4 mt-8">
            <Link
              href={`/dashboard/referrals/${referral?.id}/call`}
              target="_blank"
            >
              <DialogClose>
                <Button className="gap-1 hover:bg-primary hover:text-white">
                  <PhoneCall />
                  Atender
                </Button>
              </DialogClose>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
