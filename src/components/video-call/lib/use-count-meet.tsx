import { useDyteSelector } from "@dytesdk/react-web-core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type VideoCallContextType = {
  id: string;
};

const VideoCallContext = createContext<VideoCallContextType>(
  {} as VideoCallContextType
);

const useVideoCall = () => {
  const gridLayoutContext = useContext(VideoCallContext);

  if (!gridLayoutContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const [count, setCount] = useState(0);
  const [finish, setFinish] = useState<boolean>(false);
  const [lastMin, setLastMin] = useState<boolean>(false);
  const [renderToast, setRenderToast] = useState(true);

  const meta = useDyteSelector((meeting) => meeting.meta);

  const showMessage = (msg: string) => {
    if (renderToast) {
      toast(msg);
      setRenderToast(false);
    }
  };

  const updateCount = useCallback(() => {
    const nineMinutes = 30 * 60 * 1000;
    const tenMinutes = 31 * 60 * 1000;

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - meta.meetingStartedTimestamp.getTime();

      setCount(elapsedTime);

      if (elapsedTime >= nineMinutes && elapsedTime < tenMinutes) {
        if (!lastMin) {
          setLastMin(true);
        }
      }

      if (elapsedTime >= tenMinutes) {
        if (!finish) setFinish(true);
        setLastMin(false);
      }
    }, 1000);

    return () => clearInterval(interval); // Limpar o intervalo ao desmontar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);

  useEffect(() => {
    const clear = updateCount();
    return () => clear(); // Limpa o intervalo ao desmontar o hook
  }, [updateCount]);

  const { id } = gridLayoutContext;

  return {
    id,
    count,
    lastMin,
    finish,
    showMessage,
  };
};

export { useVideoCall, VideoCallContext };
