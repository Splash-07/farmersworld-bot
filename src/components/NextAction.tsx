import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssetInfo } from "../store/data";
import { RootState } from "../store/store";
import { msToTime } from "../utils/timers";
import { getMbsData, getToolsData } from "../service/fmdata";
import { handleNextAction } from "../service/fwactions";
import { setNextAction } from "../store/slices/user.slice";

const NextAction = () => {
  const { user } = useSelector((state: RootState) => state);
  const color = user.items.next?.type === "Wood" ? "#4299E1" : user.items.next?.type === "Gold" ? "#DD6B20" : "#319795";
  const dispatch = useDispatch();
  const items = user.items;
  // auto fetch tools data 1 per minute
  useEffect(() => {
    (async () => {
      await getToolsData(user.username!);
      await getMbsData(user.username!);
      dispatch(setNextAction());
    })();
    // setInterval(() => {
    //   getToolsData(user.username!);
    // }, 30000);
    // return () => {
    //   clearInterval();
    // };
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
    >
      <Box color={items.timer_to_action < 0 ? "tomato" : "whiteAlpha.900"}>{msToTime(items.timer_to_action)}</Box>
      <Flex gap="5px">
        <Text>Claim with:</Text>
        <Text color={color} fontWeight="semibold">
          {`${getAssetInfo(items.next!.template_id.toString())!.name}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default NextAction;
