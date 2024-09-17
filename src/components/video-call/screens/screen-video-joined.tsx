import {
  DyteAudioVisualizer,
  DyteAvatar,
  DyteNameTag,
  DyteParticipantsAudio,
  DyteParticipantTile,
} from "@dytesdk/react-ui-kit";
import { useDyteSelector } from "@dytesdk/react-web-core";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Video } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { VideoCallCoreProps } from ".";
import { ControlsBar } from "../controls";

export function ScreenJoined({ meeting, ...rest }: VideoCallCoreProps) {
  const meta = useDyteSelector((meeting) => meeting.meta);
  const participants = useDyteSelector((m) => m.participants.active);
  const [count, setCount] = useState(0);

  const participant = participants.toArray()[0];

  const updateCount = useCallback(() => {
    setInterval(() => {
      setCount(new Date().getTime() - meta.meetingStartedTimestamp.getTime());
    }, 1000);
  }, []);

  useEffect(() => {
    updateCount();
  }, [updateCount]);

  return (
    <div className="w-full h-full flex flex-col bg-[#1F2123] px-9 py-7">
      <DyteParticipantsAudio meeting={meeting} />

      <main className="grid grid-cols-7 gap-4 h-full overflow-clip">
        <div className="col-span-5 h-full flex flex-col gap-4">
          <header className=" flex items-center justify-between px-4">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-[55px] h-[52px] bg-[#0ABE93] rounded-lg flex items-center justify-center text-white">
                <Video size={36} />
              </div>

              <div>
                {/* TEXT DARK-3 */}
                <p className="capitalize font-sf-pro-display font-semibold text-[#AFAFAF] text-base">
                  {format(new Date(), "eeee, dd LLL yyyy", { locale: ptBR })}
                </p>
                <p className="font-sf-pro-display font-semibold text-white text-lg">
                  Atendimento
                </p>
              </div>
            </div>
            <div className="bg-[#FFFFFF0D] flex items-center justify-center w-[67px] py-2 rounded-xl text-white font-semibold font-sf-pro-display">
              <p>{format(count, "mm:ss")}</p>
            </div>
          </header>

          <div className="flex-grow flex-shrink-0 relative flex flex-wrap content-center justify-center gap-4 p-4 rounded-3xl bg-black">
            {/* <Grid /> */}

            {participant !== undefined && (
              <DyteParticipantTile
                participant={participant}
                meeting={meeting}
                key={participant.id}
                className="z-10 shadow-black shadow-2xl  w-full h-full duration-0"
              >
                <DyteAvatar participant={participant} size="md" />
                <DyteNameTag participant={participant} size="md">
                  <DyteAudioVisualizer
                    participant={participant}
                    size="md"
                    slot="start"
                  />
                </DyteNameTag>
              </DyteParticipantTile>
            )}

            <DyteParticipantTile
              participant={meeting.self}
              meeting={meeting}
              key={meeting.self.id}
              className="z-10 absolute bottom-44 right-4 sm:bottom-4 shadow-black shadow-2xl aspect-square w-52 h-auto duration-0"
            >
              <DyteAvatar participant={meeting.self} size="md" />
              <DyteNameTag participant={meeting.self} size="md">
                <DyteAudioVisualizer
                  participant={meeting.self}
                  size="md"
                  slot="start"
                />
              </DyteNameTag>
            </DyteParticipantTile>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-3xl"></div>
      </main>
      <ControlsBar />
    </div>
  );
}
