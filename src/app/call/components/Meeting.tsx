'use client'
import { DyteAudioVisualizer, DyteAvatar, DyteNameTag, DyteParticipantTile } from "@dytesdk/react-ui-kit";
import { useDyteMeeting, useDyteSelector } from "@dytesdk/react-web-core";
import Facetime from "./FaceTime";

export function Meeting() {
  const { meeting } = useDyteMeeting();
  const activeParticipants = useDyteSelector(
    (meeting) => meeting.participants.active.toArray()
  );

  console.log("activeParticipants =>", activeParticipants);

  function ParticipantTile({ participant, meeting }: { participant: any, meeting: any }) {
    return (
      <DyteParticipantTile
        participant={participant}
      >
        <DyteNameTag participant={participant} meeting={meeting}>
          <DyteAudioVisualizer participant={participant} />
        </DyteNameTag>
        <DyteAvatar size="sm" participant={participant} />
      </DyteParticipantTile>
    );
  }

  return (

    <div className="flex items-center justify-center w-screen h-screen">
      {/* <DyteMeeting mode="fill" meeting={meeting} showSetupScreen={false} /> */}
      {/* {activeParticipants.map(participants => (
        <ParticipantTile participant={participants} meeting={meeting} />
      ))}
      <ParticipantTile  participant={meeting.self} meeting={meeting} /> */}
      <Facetime />
    </div>
  );
}