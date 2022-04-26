import { Box, Flex, Skeleton, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { sleep } from "../utils/timers";
import { handleNextAction } from "../service/actionsHandlers";
import { MemoisedCountdown } from "./Countdown";
import { toggleUpdateData } from "../store/slices/settings.slice";
import { getTextColor } from "../utils/utils";
import { assetMap } from "../store/data";

const NextAction = () => {
  const user = useSelector((state: RootState) => state.user);
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const [breakPoint480] = useMediaQuery("(min-width: 480px)");

  let nextItem = user.items.next;

  useEffect(() => {
    if (settings.triggerNextAction) {
      (async () => {
        dispatch(toggleUpdateData(false)); // prevent data update, while doing actions
        await handleNextAction(user, settings);
        await sleep(10000);
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
          <Box width="100%">some text</Box>
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
      <MemoisedCountdown timer={nextItem.next_availability} />
      <Flex gap="5px" alignItems="center">
        <Text display={breakPoint480 ? "block" : "none"}>Claim with:</Text>
        <Text color={color} fontWeight="semibold" maxWidth="50ch" isTruncated>
          {assetMap.get(nextItem.template_id)?.name}
        </Text>
        <Text>{`${
          "durability" in nextItem
            ? `(${nextItem.current_durability}/${nextItem.durability})`
            : ""
        }`}</Text>
      </Flex>
    </Flex>
  );
};

export default NextAction;
