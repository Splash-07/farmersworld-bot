import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTableRow } from "../../service/fmdata";
import { actionClaim } from "../../service/fwactions";
import { getAssetInfo } from "../../store/data";
import { getNextTool, getTools } from "../../store/slices/user.slice";
import { RootState } from "../../store/store";
import { TableRowEnums, Tools } from "../../types/data.types";
import { msToTime } from "../../utils/timers";

const NextAction = () => {
  const { username, tools } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    setInterval(() => {
      getData();
    }, 60000);
  }, []);

  useEffect(() => {
    (async () => {
      if (tools.timer_to_action && tools.timer_to_action < 0) {
        const response = await actionClaim(tools.next!.asset_id, username!);
        console.log("fired");
        if (response.status) {
          getData();
        }
      }
    })();
  }, [tools.timer_to_action, tools.next]);

  async function getData() {
    const tools = await getTableRow(username!, TableRowEnums.tools);
    // const mbs = await getTableRow(username!, TableRowEnums.mbs);

    dispatch(getTools(tools));
    // dispatch(getMbs(mbs));
    // check which tool should be clicked next
    if (tools) {
      getLowestCD(tools);
    }
  }

  function getLowestCD(toolsArray: Tools[]) {
    const foundedItem = toolsArray.reduce((prev, cur) => {
      return prev.next_availability < cur.next_availability ? prev : cur;
    });
    const timer = foundedItem.next_availability * 1000 - new Date().getTime();
    dispatch(getNextTool({ item: foundedItem, timer }));
    return foundedItem;
  }

  if (tools.timer_to_action === undefined) return <div>Loading</div>;

  return (
    <Flex justifyContent={"center"} align={"center"} gap={"20px"} marginTop={"30px"}>
      <Box>{msToTime(tools.timer_to_action)}</Box>
      <Text textAlign={"center"}>
        Claim with:{" "}
        <span>{`${getAssetInfo(tools.next!.template_id.toString())!.name} (${tools.next?.current_durability}/${
          tools.next?.durability
        })`}</span>
      </Text>
    </Flex>
  );
};

export default NextAction;
