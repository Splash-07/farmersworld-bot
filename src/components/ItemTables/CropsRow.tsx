import { FC } from "react";

import { Box, Flex, GridItem } from "@chakra-ui/react";
import { Crop } from "../../types/data.types";
import { assetMap, itemsClaimRequiredMap } from "../../store/data";
import { getTextColor } from "../../utils/utils";
import { adjustTime, msToTime } from "../../utils/timers";

interface CropRowProps {
  item: Crop;
}

const CropRow: FC<CropRowProps> = ({ item }) => {
  const { template_id } = item;
  const asset = assetMap.get(template_id)!;
  const { name, type } = asset;

  const color = getTextColor(type);
  const timer = adjustTime({ item });

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
      <Flex justifyContent="center" w="50%" fontSize="14px">{`${
        item.times_claimed
      }/${itemsClaimRequiredMap.get(template_id)}`}</Flex>
    </GridItem>
  );
};

export default CropRow;
