import { FC } from "react";

import { Box, Flex, GridItem } from "@chakra-ui/react";
import { Mbs } from "../../types/data.types";
import { assetMap, mbsMultiMap } from "../../store/data";
import { getTextColor } from "../../utils/utils";
import { adjustTime, msToTime } from "../../utils/timers";
import { useAppSelector } from "../../hooks/store.hooks";

interface MbsRowProps {
  item: Mbs;
}

const MbsRow: FC<MbsRowProps> = ({ item }) => {
  const mbsStoreIsDisabled = useAppSelector(
    (state) => state.settings.mbsStoreIsDisabled
  );
  const { template_id } = item;
  const asset = assetMap.get(template_id)!;
  const { name, type } = asset;

  const mbsCooldown = 86400000;
  const mbsStoreLimit = mbsMultiMap.get(template_id)! + 2;
  const mbsClaimDelay = 30000;

  const color = getTextColor(type);
  const timer = adjustTime({ item, mbsStoreIsDisabled });

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
      {mbsStoreIsDisabled ? (
        <Flex justifyContent="center" w="50%" fontSize="14px"></Flex>
      ) : (
        <Flex justifyContent="center" w="50%" fontSize="14px">
          {`${
            mbsStoreLimit - Math.ceil((timer - mbsClaimDelay) / mbsCooldown)
          }/${mbsStoreLimit}`}
        </Flex>
      )}
    </GridItem>
  );
};

export default MbsRow;
