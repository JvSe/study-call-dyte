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
import { PropsWithChildren } from "react";

import { useFirebase } from "@/package/hooks/use-firebase";
import { DialogTrigger } from "@radix-ui/react-dialog";

type CallModalProps = PropsWithChildren & {
  className?: string;
  onSubmit?(): void;
  open?: boolean;
  onClose?(v: boolean): void;
};

export const ConfirmCallModal = ({
  className,
  children,
  onSubmit,
  onClose,
  open,
}: CallModalProps) => {
  const user = useAuthUser((s) => s.user);
  const { referral } = useFirebase();

  const IS_USER_SPECIALIST = user && user.id == referral?.specialist.id;

  const anotherDoctor = IS_USER_SPECIALIST
    ? referral?.requester
    : referral?.specialist;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Entrar na chamada</DialogTitle>
      <DialogDescription className="sr-only">
        O {IS_USER_SPECIALIST ? "solicitante" : "especialista"} está pronto para
        iniciar uma videochamada com você.
      </DialogDescription>
      {open === undefined && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
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
            {anotherDoctor?.inMeeting
              ? "Atender a videochamada?"
              : "Iniciar uma videochamada?"}
          </p>

          <p className="font-sf-pro-display text-lg">
            Realmente deseja{" "}
            {anotherDoctor?.inMeeting ? "atender a" : "iniciar uma"}{" "}
            videochamada com o{" "}
            {IS_USER_SPECIALIST ? "solicitante" : "especialista"}?
          </p>
          <div className="flex flex-row-reverse  gap-4 mt-8">
            <Link
              href={
                !onSubmit ? `/dashboard/referrals/${referral?.id}/call` : ""
              }
              target="_blank"
              onClick={onSubmit}
            >
              <DialogClose>
                <Button
                  // onClick={createInstantCall}
                  className="gap-1 hover:bg-primary hover:text-white"
                >
                  <PhoneCall />
                  {anotherDoctor?.inMeeting ? "Atender" : "Chamar"}
                </Button>
              </DialogClose>
            </Link>

            <DialogClose>
              <Button
                // onClick={createCall}
                variant="secondary"
                className="gap-1"
              >
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
