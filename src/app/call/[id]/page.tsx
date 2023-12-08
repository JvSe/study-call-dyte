'use client'
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { useDyteMeeting } from "@dytesdk/react-web-core";

export default function Call() {
  const { meeting } = useDyteMeeting();

  const handleJoinInCall = async () => {
    await meeting.join();
  };

  return (
    <div className="flex items-center justify-center w-screnn h-screen bg-yellow-100">
      <DyteMeeting mode="fill" meeting={meeting} />
    </div>
  )
}