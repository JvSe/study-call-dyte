'use client'
import { Spinner } from "@/components/ui/spinner";
import { useMeet } from "@/hook/user";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { useEffect } from "react";

const Loading = () => (
  <div className="flex flex-col gap-2 bg-[#633482] w-screen h-screen items-center justify-center">
    <Spinner className="" />
    <p className="text-white">Loading...</p>
  </div>
)

export default function CallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [meetingConfig, initMeeting] = useDyteClient();

  const { idMeet, userToken } = useMeet();

  useEffect(() => {
    initMeeting({
      authToken: userToken,
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, []);
  return (
    <DyteProvider value={meetingConfig} fallback={<Loading />}>
      {children}
    </DyteProvider>
  )
}
