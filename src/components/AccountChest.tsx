import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import CoinIcon from "../assets/icons/coin-icon.png";
import MilkIcon from "../assets/icons/milk-icon.png";
import EggIcon from "../assets/icons/egg-icon.png";
import BarleyIcon from "../assets/icons/barley-icon.png";
import CornIcon from "../assets/icons/corn-icon.png";

const AccountChest = () => {
  const assetsInStash = useSelector(
    (state: RootState) => state.user.items.assetsInStash
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
          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            paddingTop="1"
            paddingBottom="1"
            paddingLeft="4"
            paddingRight="4"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={CoinIcon} />
            <Text fontSize="15px">{assetsInStash.coins.length}</Text>
          </Box>
          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            paddingTop="1"
            paddingBottom="1"
            paddingLeft="4"
            paddingRight="4"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={EggIcon} />
            <Text fontSize="15px">{assetsInStash.eggs.length}</Text>
          </Box>
          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            paddingTop="1"
            paddingBottom="1"
            paddingLeft="4"
            paddingRight="4"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={MilkIcon} />
            <Text fontSize="15px">{assetsInStash.milk.length}</Text>
          </Box>
          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            paddingTop="1"
            paddingBottom="1"
            paddingLeft="4"
            paddingRight="4"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={BarleyIcon} />
            <Text fontSize="15px">{assetsInStash.barley.length}</Text>
          </Box>
          <Box
            display="flex"
            gap="15px"
            alignItems="center"
            paddingTop="1"
            paddingBottom="1"
            paddingLeft="4"
            paddingRight="4"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="whiteAlpha.100"
          >
            <Image w="32px" src={CornIcon} />
            <Text fontSize="15px">{assetsInStash.corn.length}</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountChest;
