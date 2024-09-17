"use client";

import { useDyteMeeting } from "@dytesdk/react-web-core";
import { useEffect, useId, useState } from "react";
import { DyteStateListenersUtils } from "./lib/data-state-listener";
import { CustomStates } from "./lib/types";
import { VideoCallContext } from "./lib/use-count-meet";
import { VideoUI } from "./screens";

export const VideoCallCore = () => {
  const { meeting } = useDyteMeeting();
  const id = useId();

  const [states, setStates] = useState<CustomStates>({
    meeting: "setup",
    sidebar: "chat",
  });

  useEffect(() => {
    async function setupMeetingConfigs() {
      const stateListenersUtils = new DyteStateListenersUtils(
        () => meeting,
        () => states,
        () => setStates
      );
      stateListenersUtils.addDyteEventListeners();

      console.log("to chegando aqui?");
    }

    if (meeting) {
      setupMeetingConfigs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meeting]);

  return (
    <VideoCallContext.Provider value={{ id }}>
      <VideoUI meeting={meeting} setStates={setStates} states={states} />
    </VideoCallContext.Provider>
  );
};
