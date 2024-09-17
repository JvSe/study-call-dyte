"use client";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/package/nextmed-themes/components/ui";
import { useAuthUser } from "@/store/use-authenticated-user.store";

import Image from "next/image";

import { useFirebase } from "@/package/hooks/use-firebase";

export const AlreadyCallModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose(v: boolean): void;
}) => {
  const user = useAuthUser((s) => s.user);
  const { referral } = useFirebase();

  const IS_USER_SPECIALIST = user && user.id == referral?.specialist.id;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Médico em outra chamada</DialogTitle>
      <DialogDescription className="sr-only">
        O {IS_USER_SPECIALIST ? "solicitante" : "especialista"} está em outra
        chamada no momento. <br />
        Por favor, tente novamente mais tarde..
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
          </div>
          <p className="font-sf-pro-display font-bold text-3xl">
            Médico em outra chamada
          </p>

          <p className="font-sf-pro-display text-lg text-center">
            O {IS_USER_SPECIALIST ? "solicitante" : "especialista"} está em
            outra chamada no momento. <br />
            Por favor, tente novamente mais tarde.
          </p>
          <div className="flex flex-row-reverse  gap-4 mt-8">
            <DialogClose>
              <Button className="gap-1 hover:bg-primary hover:text-white">
                Entendido
              </Button>
            </DialogClose>

            {/* <Button
              // onClick={createCall}
              variant="secondary"
              className="gap-1 bg-alert text-white"
            >
              <PhoneOff />
              Recusar
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
