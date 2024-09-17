import { useDyteMeeting, useDyteSelector } from "@dytesdk/react-web-core";
import {
  MessageSquare,
  Mic,
  MicOff,
  Phone,
  Timer,
  Video,
  VideoOff,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { EndingMeetModal } from "./components/ending-meet";
import { useVideoCall } from "./lib/use-count-meet";

type ControlButtonProps = ButtonProps & {
  enabled?: boolean;
  typeButton?: "default" | "danger";
};

const ControlButton = ({
  enabled,
  children,
  className,
  typeButton = "default",
  ...rest
}: ControlButtonProps) => {
  return (
    <Button
      size="clean"
      variant="clean"
      className={cn(
        "w-[67px] h-[60px] border flex items-center justify-center rounded-md border-none bg-[#FFFFFF0D] border-[#4D5C7740] text-white",
        typeButton === "danger" && !enabled && "bg-[#F04848] text-white",
        typeButton === "default" && enabled && "bg-[#69AEFF] text-[#1F2123]",
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

const TimerEndingCall = () => {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-[67px] h-[60px] border flex items-center justify-center rounded-md border-none bg-[#FFFFFF0D] border-[#4D5C7740] text-white",
        " text-[#1F2123]"
      )}
    >
      <Timer />
      <div className="radial-fill w-full h-full absolute top-0 left-0" />
    </div>
  );
};

export const ControlsBar = () => {
  const { meeting } = useDyteMeeting();
  const { lastMin } = useVideoCall();

  const participant = meeting.participants.joined.toArray()[0];

  const { videoEnabled, audioEnabled, shareEnabled } = useDyteSelector((m) => ({
    videoEnabled: m.self.videoEnabled,
    audioEnabled: m.self.audioEnabled,
    shareEnabled: m.self.screenShareEnabled,
  }));

  const toggleCamera = () => {
    if (meeting.self.videoEnabled) {
      meeting.self.disableVideo();
    } else {
      meeting.self.enableVideo();
    }
  };

  // const toggleShareScreen = () => {
  //   if (meeting.self.screenShareEnabled) {
  //     meeting.self.disableScreenShare();
  //   } else {
  //     meeting.self.enableScreenShare();
  //   }
  // };

  const toggleMic = () => {
    if (meeting.self.audioEnabled) {
      meeting.self.disableAudio();
    } else {
      meeting.self.enableAudio();
    }
  };

  const leaveMeeting = async () => {
    if (participant) await participant.kick();
    meeting.leaveRoom();
  };

  return (
    <footer className="py-4 w-full flex gap-4 justify-center">
      <div className="flex gap-2 ml-auto">
        <ControlButton
          enabled={audioEnabled}
          onClick={toggleMic}
          typeButton="danger"
        >
          {audioEnabled ? <Mic size={26} /> : <MicOff size={26} />}
        </ControlButton>
        <ControlButton
          enabled={videoEnabled}
          onClick={toggleCamera}
          typeButton="danger"
        >
          {" "}
          {videoEnabled ? <Video size={26} /> : <VideoOff size={26} />}
        </ControlButton>
        {/* <ControlButton
          enabled={shareEnabled}
          // onClick={toggleShareScreen}
          icon={shareEnabled ? "share-screen" : "no-share-screen"}
        /> */}
      </div>

      <div className="flex gap-2 ml-auto">
        {lastMin && <TimerEndingCall />}
        <ControlButton enabled={true}>
          <MessageSquare size={26} />
        </ControlButton>
        <ControlButton enabled={false}>
          <p className="text-2xl mb-2">...</p>
        </ControlButton>
        <EndingMeetModal onSubmit={leaveMeeting}>
          <ControlButton
            // enabled={audioEnabled}
            typeButton="danger"
          >
            <Phone size={26} className="rotate-[135deg]" />
          </ControlButton>
        </EndingMeetModal>
      </div>
    </footer>
  );
};
