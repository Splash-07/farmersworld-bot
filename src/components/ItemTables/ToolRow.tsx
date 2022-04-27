import { FC } from "react";

import { Box, Flex, GridItem } from "@chakra-ui/react";
import { MbsResponse, Tool } from "../../types/data.types";
import { assetMap, mbsMultiMap } from "../../store/data";
import { filterMbsByType, getTextColor } from "../../utils/utils";
import { adjustTime, msToTime } from "../../utils/timers";

interface ToolRowProps {
  item: Tool;
  mbs: MbsResponse;
}

const ToolRow: FC<ToolRowProps> = ({ item, mbs }) => {
  const { template_id } = item;
  const asset = assetMap.get(template_id)!;
  const { name, type } = asset;

  const color = getTextColor(type);
  const timer = adjustTime(item, mbs);

  // count store/max store
  const exception = ["Ancient Stone Axe", "Mining Excavator"];
  const hour = exception.includes(name) ? 7200000 : 3600000;
  const filteredMbs = filterMbsByType(mbs, type);
  const canBeStored =
    filteredMbs.reduce(
      (acc, cur) => (acc += mbsMultiMap.get(cur.template_id)!),
      0
    ) + 1;
  const currentlyStored = canBeStored - Math.ceil(timer / hour);

  return (
    <GridItem
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="100%"
    >
      <Box overflow="hidden" isTruncated color={color} w="100%">
        {name}
      </Box>
      <Flex
        justifyContent="center"
        w="50%"
        fontSize="14px"
        color={timer < 0 ? "tomato" : "whiteAlpha.900"}
      >
        {msToTime(timer)}
      </Flex>
      <Flex
        justifyContent="center"
        w="50%"
        fontSize="14px"
      >{`${currentlyStored}/${canBeStored}`}</Flex>
    </GridItem>
  );
};

export default ToolRow;
