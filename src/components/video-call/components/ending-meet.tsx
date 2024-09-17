import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PhoneOff } from "lucide-react";
import Image from "next/image";
import { PropsWithChildren } from "react";

type EndingMeetModalProps = PropsWithChildren & {
  onSubmit(): void;
};

export const EndingMeetModal = ({
  onSubmit,
  children,
}: EndingMeetModalProps) => {
  return (
    <Dialog>
      <DialogTitle className="sr-only">Encerrar a videochamada?</DialogTitle>
      <DialogDescription className="sr-only">
        Realmente deseja encerrar a videochamada? A chamada encerrará para ambos
        os participantes
      </DialogDescription>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[700px] rounded-3xl bg-[#F5F5F5] md:bg-white border-2 border-white py-14 dark:bg-dark-background dark:border-dark-border">
        <div className="flex flex-col gap-2 items-center justify-center mt-2">
          <div className="flex relative">
            <Image
              src="/app/doctor-warning.svg"
              width={200}
              height={200}
              alt="Doctor Introduction"
              className="w-[113px] -scale-x-100"
            />
          </div>
          <p className="font-sf-pro-display font-bold text-3xl">
            Encerrar a videochamada?
          </p>

          <p className="font-sf-pro-display text-lg text-center">
            Realmente deseja encerrar a videochamada? <br />A chamada encerrará
            para ambos os participantes
          </p>
          <div className="flex flex-row-reverse  gap-4 mt-8">
            <DialogClose>
              <Button
                onClick={onSubmit}
                className="gap-1 border-alert bg-alert-100 hover:bg-alert text-white hover:text-white"
              >
                <PhoneOff />
                Encerrar
              </Button>
            </DialogClose>

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
