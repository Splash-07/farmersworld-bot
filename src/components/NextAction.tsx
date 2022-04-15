import { Box, Flex, Skeleton, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { sleep } from "../utils/timers";
import { handleNextAction } from "../service/fwactions";
import Countdown from "./Countdown";
import { toggleUpdateData } from "../store/slices/settings.slice";
import { getTextColor } from "../utils/utils";
import { assetMap } from "../store/data";

const NextAction = () => {
  const { user, settings } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [breakPoint480] = useMediaQuery("(min-width: 480px)");

  let nextItem = user.items.next;

  useEffect(() => {
    if (settings.triggerNextAction) {
      (async () => {
        dispatch(toggleUpdateData(false)); // prevent data update, while doing actions
        await handleNextAction(user, settings);
        await sleep(5000);
        dispatch(toggleUpdateData(true));
      })();
    }
  }, [settings.triggerNextAction]);

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
  const color = getTextColor(assetMap.get(nextItem.template_id)!.type);
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
      <Countdown timer={nextItem.timer_to_action} />
      <Flex gap="5px" alignItems="center">
        <Text display={breakPoint480 ? "block" : "none"}>Claim with:</Text>
        <Text color={color} fontWeight="semibold" maxWidth="50ch" isTruncated>
          {assetMap.get(nextItem.template_id)?.name}
        </Text>
        <Text>{`${"durability" in nextItem ? `(${nextItem.current_durability}/${nextItem.durability})` : ""}`}</Text>
        <Text>{`[id:${nextItem.asset_id}]`}</Text>
      </Flex>
    </Flex>
  );
};

export default NextAction;
