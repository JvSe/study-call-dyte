"use client";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/store/use-auth";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import Facetime from "../components/Facetime";

export default function Call({ params }: { params: { id: string } }) {
  const [client, initMeeting] = useDyteClient();
  const user = useAuth((s) => s.user);

  // useEffect(() => {
  //   if (userToken !== undefined) {
  //     initMeeting({
  //       authToken: userToken,
  //       defaults: {
  //         audio: true,
  //         video: true,
  //       },
  //     }).then((m) => m?.joinRoom());
  //   }
  // }, [userToken]);

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
