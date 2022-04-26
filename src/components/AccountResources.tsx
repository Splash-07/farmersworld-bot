import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import WoodIcon from "../assets/icons/wood-icon.png";
import FoodIcon from "../assets/icons/food-icon.png";
import GoldIcon from "../assets/icons/gold-icon.png";
import EnergyIcon from "../assets/icons/energy-icon.png";

const AccountResources = () => {
  const user = useSelector((state: RootState) => state.user);
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
          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            padding="1.5"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={WoodIcon} />
            <Text fontSize="15px">
              {user.resources?.balances.wood.toFixed(2)}
            </Text>
          </Box>
          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            padding="1.5"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={GoldIcon} alignContent="center" />
            <Text fontSize="15px">
              {user.resources?.balances.gold.toFixed(2)}
            </Text>
          </Box>

          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            padding="1.5"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={FoodIcon} />
            <Text fontSize="15px">
              {user.resources?.balances.food.toFixed(2)}
            </Text>
          </Box>
          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            padding="1.5"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={EnergyIcon} />
            <Text fontSize="15px">{`${user.resources?.energy} / ${user.resources?.max_energy}`}</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountResources;
