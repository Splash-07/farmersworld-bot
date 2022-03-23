import { Box, Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { assetNameMap, filterMbsByType, mbsMultiMap } from "../store/data";
import { RootState } from "../store/store";
import { MbsResponse, ToolsResponse } from "../types/data.types";
import { adjustedTime, msToTime } from "../utils/timers";
import { getTextColor } from "../utils/utils";

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
    const toolName = assetNameMap.get(template_id);
    if (toolName) {
      const color = getTextColor(responseItem.type);
      const timer = adjustedTime(responseItem, mbs);

      // count store/max store
      const exception = ["Ancient Stone Axe", "Mining Excavator"];
      const hour = exception.includes(toolName) ? 7200000 : 3600000;

      const filteredMbs = filterMbsByType(mbs, responseItem.type);

      const canBeStored =
        filteredMbs.reduce((acc, cur) => (acc += mbsMultiMap.get(cur.template_id.toString())!), 0) + 1;

      const currentlyStored = canBeStored - Math.ceil(timer / hour);
      return (
        <GridItem key={key} display="flex" alignItems="center" justifyContent="space-between" w="100%">
          <Box minWidth="130px" overflow="hidden" isTruncated color={color}>
            {toolName}
          </Box>
          <Flex justifyContent="center" w="100%" fontSize="14px" color={timer < 0 ? "tomato" : "whiteAlpha.900"}>
            {msToTime(timer)}
          </Flex>
          {!assetNameMap.get(template_id)?.includes("Membership") ? (
            <Flex justifyContent="center" w="100%" fontSize="14px">{`${currentlyStored}/${canBeStored}`}</Flex>
          ) : (
            <Flex justifyContent="center" w="100%" fontSize="14px"></Flex>
          )}
        </GridItem>
      );
    }
  }

  return (
    <Grid
      width={breakPoint480 ? "unset" : "100%"}
      backgroundColor="whiteAlpha.100"
      alignContent="flex-start"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      overflowX="auto"
      w="100%"
      maxWidth="300px"
    >
      <GridItem display="flex" alignItems="center" justifyContent="space-between" w="100%" textAlign={"center"}>
        <Flex w="100%" minWidth="130px" justifyContent="center">
          Asset name
        </Flex>
        <Flex justifyContent="center" textAlign="center" w="100%">
          Timer
        </Flex>
        <Flex justifyContent="center" textAlign="center" w="100%">
          Stored
        </Flex>
      </GridItem>
      <Grid
        gap="1px"
        maxHeight="300px"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "3px",
            borderRadius: "8px",
            backgroundColor: `whiteAlpha.100`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `whiteAlpha.300`,
          },
        }}
      >
        {items.toolsList &&
          sortList(items.toolsList).map((tool, index) =>
            renderAsset(tool, tool.template_id.toString(), index, items.mbsList)
          )}
        {items.mbsList &&
          items.mbsList.map((tool, index) => renderAsset(tool, tool.template_id.toString(), index, items.mbsList))}
      </Grid>
    </Grid>
  );
};

export default ToolsList;
