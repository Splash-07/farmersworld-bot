import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { sleep } from "../utils/timers";
import { handleNextAction } from "../service/fwactions";
import { assetNameMap } from "../store/data";
import Countdown from "./Countdown";
import useSound from "use-sound";
import { toggleUpdateData } from "../store/slices/settings.slice";
import { getTextColor } from "../utils/utils";
const notify_sound = require("../assets/notify_sound.mp3");

const NextAction = () => {
  const { user, settings } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const color = getTextColor(user.items.next?.type!);

  const [breakPoint480] = useMediaQuery("(min-width: 480px)");
  const [notificationSound] = useSound(notify_sound);

  useEffect(() => {
    if (user.items.next && user.items.next?.timer_to_action < 0) {
      (async () => {
        dispatch(toggleUpdateData(false)); // prevent data update, while doing actions
        await handleNextAction(user, settings);
        if (!settings.soundIsDisabled) notificationSound();
        await sleep(8000);
        dispatch(toggleUpdateData(true));
      })();
    }
  }, [user.items.next?.timer_to_action, user.items.next]);

  if (user.items.next?.timer_to_action === undefined) return <div>Loading</div>;

  return (
    <Flex
      gap={"5px"}
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      w="100%"
      justifyContent="center"
      fontSize="15px"
    >
      {/* <Box color={user.items.next.timer_to_action < 0 ? "tomato" : "whiteAlpha.900"}>{msToTime(user.items.next.timer_to_action)}</Box> */}
      <Countdown timer={user.items.next.timer_to_action} />
      <Flex gap="3px">
        <Text display={breakPoint480 ? "block" : "none"}>Claim with:</Text>
        <Text color={color} fontWeight="semibold" maxWidth="20ch" isTruncated>
          {assetNameMap.get(user.items.next.template_id.toString())}
        </Text>
        <Text>{`(${
          "durability" in user.items.next ? `${user.items.next.current_durability}/${user.items.next.durability})` : ""
        }`}</Text>
      </Flex>
    </Flex>
  );
};

export default NextAction;
