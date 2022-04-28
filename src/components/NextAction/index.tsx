import { useEffect } from "react";
import { MemoisedCountdown } from "./Countdown";

import { assetMap } from "../../store/data";
import { toggleUpdateData } from "../../store/slices/settings.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hooks";
import { getTextColor } from "../../utils/utils";
import { sleep } from "../../utils/timers";
import { handleNextAction } from "../../service/action.service";

import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

const NextAction = () => {
  const data = useAppSelector((state) => state.data);
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  let nextItem = data.items.next;

  useEffect(() => {
    if (settings.triggerNextAction) {
      (async () => {
        dispatch(toggleUpdateData(false)); // prevent data update, while doing actions
        await handleNextAction(data, settings);
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
        <Text>Claim with:</Text>
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
