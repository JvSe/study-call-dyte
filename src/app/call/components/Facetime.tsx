import {
  DyteAudioVisualizer,
  DyteAvatar,
  DyteNameTag,
  DyteParticipantsAudio,
  DyteParticipantTile,
} from "@dytesdk/react-ui-kit";
import { useDyteMeeting, useDyteSelector } from "@dytesdk/react-web-core";
import clsx from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import {
  Airplay,
  MessageSquare,
  Mic,
  MicOff,
  Phone,
  Video,
  VideoOff,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function Controlbar() {
  const { meeting } = useDyteMeeting();

  const { videoEnabled, audioEnabled } = useDyteSelector((m) => ({
    videoEnabled: m.self.videoEnabled,
    audioEnabled: m.self.audioEnabled,
  }));

  const toggleCamera = () => {
    if (meeting.self.videoEnabled) {
      meeting.self.disableVideo();
    } else {
      meeting.self.enableVideo();
    }
  };

  const toggleMic = () => {
    if (meeting.self.audioEnabled) {
      meeting.self.disableAudio();
    } else {
      meeting.self.enableAudio();
    }
  };

  const leaveMeeting = () => {
    meeting.leaveRoom();
  };

  return (
    <footer className="py-2 w-full flex gap-4 justify-center">
      <div className="flex gap-2 ml-auto">
        <button
          className={clsx(
            "w-[67px] h-[60px] border flex items-center justify-center rounded-md",
            audioEnabled
              ? "bg-[#FFFFFF0D] border-[#4D5C7740] text-white"
              : "bg-[#F04848] text-white border-none"
          )}
          onClick={toggleMic}
        >
          {audioEnabled ? <Mic size={26} /> : <MicOff size={26} />}
        </button>
        <button
          className={clsx(
            "w-[67px] h-[60px] border flex items-center justify-center rounded-md",
            videoEnabled
              ? "bg-[#FFFFFF0D] border-[#4D5C7740] text-white"
              : "bg-[#F04848] text-white border-none"
          )}
          onClick={toggleCamera}
        >
          {videoEnabled ? <Video size={26} /> : <VideoOff size={26} />}
        </button>
        <button
          className={clsx(
            "w-[67px] h-[60px] border flex items-center justify-center rounded-md",
            "bg-[#FFFFFF0D] border-[#4D5C7740] text-white"
          )}
          // onClick={leaveMeeting}
        >
          <Airplay size={26} />
        </button>
      </div>

      <div className="flex gap-2 ml-auto">
        <button
          className={clsx(
            "w-[67px] h-[60px] border flex items-center justify-center rounded-md",
            "bg-[#FFFFFF0D] border-[#4D5C7740] text-white"
          )}
          onClick={toggleMic}
        >
          <MessageSquare size={26} />
        </button>
        <button
          className={clsx(
            "w-[67px] h-[60px] border flex items-center justify-center rounded-md",
            "bg-[#69AEFF] border-[#4D5C7740] text-[#1F2123]"
          )}
          onClick={toggleCamera}
        >
          <p className="text-2xl mb-2">...</p>
        </button>
        <button
          className={clsx(
            "w-[67px] h-[60px] ml-14 border flex items-center justify-center rounded-md",
            "bg-[#F04848] border-[#4D5C7740] text-white"
          )}
          // onClick={leaveMeeting}
        >
          <Phone size={26} className="rotate-[135deg]" />
        </button>
      </div>
    </footer>
  );
}

function VideoCall() {
  const { meeting } = useDyteMeeting();
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
      <Controlbar />
    </div>
  );
}

export default function Meeting() {
  const roomJoined = useDyteSelector((meeting) => meeting.self.roomJoined);

  if (!roomJoined) {
    return (
      <div className="bg-black text-white w-full h-full flex place-items-center justify-center">
        <p className="text-2xl">You are not in the meeting.</p>
      </div>
    );
  }

  return <VideoCall />;
}
