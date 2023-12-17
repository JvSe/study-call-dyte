'use client'
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";

export function Meeting() {
  const { meeting } = useDyteMeeting();

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <DyteMeeting mode="fill" meeting={meeting} showSetupScreen={false} />
      {/* <ModalSignIn open={isOpen} onClose={() => setIsOpen(false)} idMeet={id!} /> */}
    </div>
  )
}