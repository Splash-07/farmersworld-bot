import { Box } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { triggerNextAction } from "../store/slices/settings.slice";
import { msToTime } from "../utils/timers";

const Countdown = ({ timer }: { timer: number }) => {
  const [ms, setMs] = useState(timer);
  const dispatch = useDispatch();
  useEffect(() => {
    setMs(timer);
  }, [timer]);
  useEffect(() => {
    if (ms < 0) {
      dispatch(triggerNextAction(true));
    } else {
      const interval = setInterval(() => setMs(ms - 1000), 1000);
      return () => clearInterval(interval);
    }
  }, [ms, dispatch]);

  return <Box color={ms < 0 ? "tomato" : "whiteAlpha.900"}>{msToTime(ms)}</Box>;
};
export default Countdown;
// memoised component, cuz of needles rerender, when clicking in sequences (that trigger next action)
export const MemoisedCountdown = memo(Countdown);
