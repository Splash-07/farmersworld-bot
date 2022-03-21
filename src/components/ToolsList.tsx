import { Box, Center, useMediaQuery, Wrap, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getAssetInfo } from "../store/data";
import { RootState } from "../store/store";
import { MbsResponse, ToolsResponse } from "../types/data.types";
import { adjustedTime, msToTime } from "../utils/timers";

const ToolsList = () => {
  const [breakPoint480] = useMediaQuery("(min-width: 480px)");
  const { items } = useSelector((state: RootState) => state.user);

  function sortList(list: ToolsResponse[]) {
    const array = [...list];
    const sorted = array.sort((a, b) => {
      if (a.type > b.type) return 1;
      if (b.type > a.type) return -1;
      return 0;
    });
    return sorted;
  }

  function renderAsset(
    responseItem: ToolsResponse | MbsResponse,
    template_id: string,
    key: number,
    mbs: MbsResponse[]
  ) {
    const asset = getAssetInfo(template_id);
    if (asset) {
      const color = responseItem.type === "Wood" ? "#4299E1" : responseItem.type === "Gold" ? "#DD6B20" : "#319795";
      const timer = adjustedTime(responseItem, mbs);
      return (
        <WrapItem key={key} alignItems="center" justifyContent="space-evenly" w="100%">
          <Box width={breakPoint480 ? "150px" : "200px"} overflow="hidden" isTruncated color={color}>
            {asset.name}
          </Box>
          <Box fontSize="14px" color={timer < 0 ? "tomato" : "whiteAlpha.900"}>
            {msToTime(timer)}
          </Box>
        </WrapItem>
      );
    }
  }

  return (
    <Wrap
      width={breakPoint480 ? "unset" : "100%"}
      direction="column"
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
    >
      <Center display="flex" flexDir="column" width="100%">
        {items.toolsList &&
          sortList(items.toolsList).map((tool, index) =>
            renderAsset(tool, tool.template_id.toString(), index, items.mbsList)
          )}
        {items.mbsList &&
          items.mbsList.map((tool, index) => renderAsset(tool, tool.template_id.toString(), index, items.mbsList))}
      </Center>
    </Wrap>
  );
};

export default ToolsList;
