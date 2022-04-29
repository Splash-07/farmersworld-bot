import AssetInfo from "./AssetInfo";
import { useAppSelector } from "../../hooks/store.hooks";

import WoodIcon from "../../assets/icons/wood-icon.png";
import FoodIcon from "../../assets/icons/food-icon.png";
import GoldIcon from "../../assets/icons/gold-icon.png";
import EnergyIcon from "../../assets/icons/energy-icon.png";

import { Flex, Text } from "@chakra-ui/react";

const AccountResources = () => {
  const resources = useAppSelector((state) => state.data.resources);
  return (
    <Flex
      justify="space-evenly"
      gap={"5px"}
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="5"
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
          Account resources
        </Text>
        <Flex gap="20px">
          <AssetInfo
            image={WoodIcon}
            text={resources?.balances.wood.toFixed(2)}
          />
          <AssetInfo
            image={GoldIcon}
            text={resources?.balances.gold.toFixed(2)}
          />
          <AssetInfo
            image={FoodIcon}
            text={resources?.balances.food.toFixed(2)}
          />
          <AssetInfo
            image={EnergyIcon}
            text={resources && `${resources.energy} / ${resources.max_energy}`}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountResources;
