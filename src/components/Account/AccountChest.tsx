import AssetInfo from "./AssetInfo";
import { useAppSelector } from "../../hooks/store.hooks";

import { Flex, Text } from "@chakra-ui/react";

import CoinIcon from "../../assets/icons/coin-icon.png";
import MilkIcon from "../../assets/icons/milk-icon.png";
import EggIcon from "../../assets/icons/egg-icon.png";
import BarleyIcon from "../../assets/icons/barley-icon.png";
import CornIcon from "../../assets/icons/corn-icon.png";

const AccountChest = () => {
  const assetsInStash = useAppSelector(
    (state) => state.data.items.assetsInStash
  );

  return (
    <Flex
      justify="space-evenly"
      gap={"5px"}
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      w="100%"
      justifyContent="center"
      fontSize="15px"
    >
      <Flex gap="10px" flexDir={"column"} flexWrap="wrap">
        <Text
          textAlign="center"
          textTransform="uppercase"
          fontWeight="semibold"
        >
          Account Chest
        </Text>
        <Flex justifyContent="space-between" gap="15px">
          <AssetInfo
            image={CoinIcon}
            text={assetsInStash?.coins.length.toString()}
          />
          <AssetInfo
            image={EggIcon}
            text={assetsInStash?.eggs.length.toString()}
          />
          <AssetInfo
            image={MilkIcon}
            text={assetsInStash?.milk.length.toString()}
          />
          <AssetInfo
            image={BarleyIcon}
            text={assetsInStash?.barley.length.toString()}
          />
          <AssetInfo
            image={CornIcon}
            text={assetsInStash?.corn.length.toString()}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountChest;
