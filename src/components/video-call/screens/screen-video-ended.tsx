import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export const ScreenEnded = () => {
  // // ATUALIZAR A REFERRAL PARA OBTER OS DADOS DO PARTICIPANTE QUE VEM DO DYTE
  // const { mutateAsync: updateUserMeeting, isPending } =
  //   useUpdateUserMeetingMutation({
  //     onSuccess: () => {
  //       localStorage.removeItem(`@nextmed:call-modal-closed-${referral?.id}`); // Marca o modal como fechado
  //       setTimeout(() => {
  //         window.close();
  //       }, 5000);
  //     },
  //   });

  // const updateAllDoctors = useCallback(async () => {
  //   await Promise.all(
  //     [referral?.specialist, referral?.requester].map(async (doctorProps) => {
  //       if (referral && referral.meeting && doctorProps?.inMeeting) {
  //         await updateUserMeeting({
  //           data: { inMeeting: false, userId: doctorProps!.id },
  //           meetingId: referral.meeting.id,
  //           referralId: referral.localId,
  //         });
  //       }
  //     })
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [referral]);

  // useEffect(() => {
  //   if (referral?.specialist.inMeeting || referral?.requester.inMeeting)
  //     updateAllDoctors();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [updateAllDoctors]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card
        className={
          "min-w-[700px] rounded-3xl bg-[#F5F5F5] shadow-md md:bg-white border-2 border-white py-14 dark:bg-dark-background dark:border-dark-border"
        }
      >
        <CardContent className="grid gap-4">
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
            <h1 className="font-sf-pro-display font-bold text-3xl">
              Encerrando a videochamada
            </h1>
            <p className="font-sf-pro-display text-lg text-center">
              Essa aba será fechada automaticamente em breve.
            </p>
          </div>
        </CardContent>
        <CardFooter className="w-min mx-auto mt-5">
          <Spinner />
        </CardFooter>
      </Card>
    </div>
  );
};
