import { FC } from "react";

import { Animal } from "../../types/data.types";
import {
  animalsDailyClaimLimitMap,
  assetMap,
  itemsClaimRequiredMap,
} from "../../store/data";
import { getTextColor } from "../../utils/utils";
import { adjustTime, filterDailyLimits, msToTime } from "../../utils/timers";

import { Box, Flex, GridItem } from "@chakra-ui/react";

interface AnimalRowProps {
  item: Animal;
}

const AnimalRow: FC<AnimalRowProps> = ({ item }) => {
  const { day_claims_at, template_id, times_claimed } = item;
  const asset = assetMap.get(template_id)!;
  const { name, type } = asset;
  const dayLimit = animalsDailyClaimLimitMap.get(template_id);

  const color = getTextColor(type);
  const timer = adjustTime({ item });

  function showLimit() {
    return (
      day_claims_at.length === dayLimit &&
      filterDailyLimits(day_claims_at).length === 0
    );
  }

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
      {showLimit() ? (
        <Flex justifyContent="center" w="50%" fontSize="14px" color="tomato">
          Daily limit
        </Flex>
      ) : (
        <Flex
          justifyContent="center"
          w="50%"
          fontSize="14px"
          color={timer < 0 ? "tomato" : "whiteAlpha.900"}
        >
          {msToTime(timer)}
        </Flex>
      )}
      <Flex
        justifyContent="center"
        w="50%"
        fontSize="14px"
      >{`${times_claimed}/${itemsClaimRequiredMap.get(template_id)}`}</Flex>
    </GridItem>
  );
};

export default AnimalRow;
