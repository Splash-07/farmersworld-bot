import { Box } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { msToTime } from "../utils/timers";

const Countdown = ({
  timer,
  setTriggerAction,
}: {
  timer: number;
  setTriggerAction: Dispatch<SetStateAction<boolean>>;
}) => {
  const [ms, setMs] = useState(timer);
  useEffect(() => {
    setMs(timer);
  }, [timer]);

  useEffect(() => {
    // delay before claim action
    const delay = 5000;
    if (ms + delay < 0) {
      console.log(ms);
      setTriggerAction(true);
    } else {
      const interval = setInterval(() => setMs(ms - 1000), 1000);
      return () => clearInterval(interval);
    }
  }, [ms, setTriggerAction]);

  return <Box color={ms < 0 ? "tomato" : "whiteAlpha.900"}>{msToTime(ms)}</Box>;
};

export default Countdown;
