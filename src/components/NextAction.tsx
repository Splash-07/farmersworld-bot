import { Box, Flex, Skeleton, Text, useMediaQuery } from "@chakra-ui/react";
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
  const [triggerAction, setTriggerAction] = useState(false);
  const dispatch = useDispatch();

  const [breakPoint480] = useMediaQuery("(min-width: 480px)");
  const [notificationSound] = useSound(notify_sound);

  let nextItem = user.items.next;
  const color = nextItem && "durability" in nextItem ? getTextColor(nextItem.type) : getTextColor("Crops");

  useEffect(() => {
    if (triggerAction) {
      (async () => {
        dispatch(toggleUpdateData(false)); // prevent data update, while doing actions
        if (!settings.soundIsDisabled) notificationSound();
        await handleNextAction(user, settings);
        await sleep(5000);
        dispatch(toggleUpdateData(true));
        await sleep(3000);
        setTriggerAction(false);
      })();
    }
  }, [triggerAction]);

  if (!nextItem)
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
        <Skeleton width="100%">
          <Box width="100%">dsadasd</Box>
        </Skeleton>
      </Flex>
    );

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
      <Countdown setTriggerAction={setTriggerAction} timer={nextItem.timer_to_action} />
      <Flex gap="3px" alignItems="center">
        <Text display={breakPoint480 ? "block" : "none"}>Claim with:</Text>
        <Text color={color} fontWeight="semibold" maxWidth="50ch" isTruncated>
          {assetNameMap.get(nextItem.template_id.toString())}
        </Text>
        <Text>{`${"durability" in nextItem ? `(${nextItem.current_durability}/${nextItem.durability})` : ""}`}</Text>
      </Flex>
    </Flex>
  );
};

export default NextAction;
