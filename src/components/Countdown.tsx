import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { triggerNextAction } from "../store/slices/settings.slice";
import { RootState } from "../store/store";
import { msToTime } from "../utils/timers";

const Countdown = ({ timer }: { timer: number }) => {
  const { settings } = useSelector((state: RootState) => state);
  const [ms, setMs] = useState(timer);
  const dispatch = useDispatch();
  useEffect(() => {
    setMs(timer);
  }, [timer]);
  useEffect(() => {
    // delay before claim action
    const delay = 3000;
    if (ms + delay < 0) {
      console.log(ms + delay);
      // fix for consistent claims
      dispatch(triggerNextAction(true));
    } else {
      const interval = setInterval(() => setMs(ms - 1000), 1000);
      return () => clearInterval(interval);
    }
  }, [ms, dispatch]);

  return <Box color={ms < 0 ? "tomato" : "whiteAlpha.900"}>{msToTime(ms)}</Box>;
};

export default Countdown;
