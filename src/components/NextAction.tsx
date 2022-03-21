import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { msToTime } from "../utils/timers";
import { getAccountData, getMbsData, getToolsData } from "../service/fmdata";
import { setNextAction } from "../store/slices/user.slice";
import { assetNameMap } from "../store/data";

const NextAction = () => {
  const { username, items } = useSelector((state: RootState) => state.user);
  const color = items.next?.type === "Wood" ? "#4299E1" : items.next?.type === "Gold" ? "#DD6B20" : "#319795";
  const dispatch = useDispatch();

  // auto fetch tools data 1 per minute
  useEffect(() => {
    (async () => {
      await getToolsData(username!);
      await getMbsData(username!);
      dispatch(setNextAction());
    })();
    setInterval(async () => {
      await getAccountData(username!);
      await getToolsData(username!);
      await getMbsData(username!);
      dispatch(setNextAction());
    }, 30000);
    return () => {
      clearInterval();
    };
  }, []);

  // claim next item if timer is up
  // useEffect(() => {
  //   (async () => {
  //     if (user.tools.timer_to_action && user.tools.timer_to_action < 0) {
  //       console.log("Timer is up, starting action");
  //       await handleNextAction(user.tools.next!);
  //     }
  //   })();
  // }, [user.tools.timer_to_action, user.tools.next]);

  if (items.timer_to_action === undefined) return <div>Loading</div>;

  return (
    <Flex
      gap={"20px"}
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      w="100%"
      justifyContent="center"
      fontSize="15px"
    >
      <Box color={items.timer_to_action < 0 ? "tomato" : "whiteAlpha.900"}>{msToTime(items.timer_to_action)}</Box>
      <Flex gap="5px">
        <Text>Claim with:</Text>
        <Text color={color} fontWeight="semibold">
          {`${assetNameMap.get(items.next!.template_id.toString())}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default NextAction;
