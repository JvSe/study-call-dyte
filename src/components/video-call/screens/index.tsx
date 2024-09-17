import DyteClient from "@dytesdk/web-core";
import { Spinner } from "../../ui/spinner";
import { CustomStates, SetStates } from "../lib/types";
import { useVideoCall } from "../lib/use-count-meet";
import { ScreenEnded } from "./screen-video-ended";
import { ScreenJoined } from "./screen-video-joined";

export type VideoCallCoreProps = {
  meeting: DyteClient;
  states: CustomStates;
  setStates: SetStates;
};

export function VideoUI({ ...rest }: VideoCallCoreProps) {
  const { lastMin, showMessage } = useVideoCall();

  if (lastMin) showMessage("A chamada encerrará em 1 minuto");

  if (!rest.meeting || rest.states.meeting === "setup") {
    return (
      <div className="flex flex-col gap-2 bg-[#633482] w-screen h-screen items-center justify-center">
        <Spinner className="" />
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (rest.states.meeting === "ended") {
    return <ScreenEnded />;
  }

  if (rest.states.meeting === "joined") {
    return <ScreenJoined {...rest} />;
  }
}
