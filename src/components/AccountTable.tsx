import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAccountData, getToolsData } from "../service/fmdata";
import { RootState } from "../store/store";

import woodIcon from "../assets/icons/wood-icon.png";
import meatIcon from "../assets/icons/meat-icon.png";
import goldIcon from "../assets/icons/gold-icon.png";
import energyIcon from "../assets/icons/energy-icon.png";
import { toggleUpdateFarm } from "../store/slices/settings.slice";

const balanceIcons = [woodIcon, goldIcon, meatIcon, energyIcon];

const AccountTable = () => {
  const { user, settings } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  // fetch account data on mount
  useEffect(() => {
    (async () => {
      await getAccountData(user.username!);
    })();
  }, []);

  // fetch data on updateFarm toggle
  useEffect(() => {
    if (settings.updateFarm === true) {
      (async () => {
        if (user.username) {
          await getAccountData(user.username);
          await getToolsData(user.username);
          dispatch(toggleUpdateFarm(false));
        }
      })();
    }
  }, [settings.updateFarm]);
  return (
    <Flex
      flexDir="column"
      justify="center"
      align="center"
      gap="20px"
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
    >
      <Flex gap="5px">
        <Text>Logged in as</Text>
        <Text color="orange.100" fontWeight="semibold">
          {user.username}
        </Text>
      </Flex>
      <Flex gap="20px" justifyContent="space-evenly" w="100%" flexWrap="wrap">
        {user.account &&
          Object.entries(user.account.balances).map((type, index) => (
            <Box key={type[0]} display="flex" gap="15px" alignContent="center" alignItems="center">
              <Image w="32px" src={balanceIcons[index]} />
              <Text fontSize="15px">{`${type[1].toFixed(2)}`}</Text>
            </Box>
          ))}
        <Box display="flex" gap="15px" alignContent="center" alignItems="center">
          <Image w="32px" src={energyIcon} />
          <Text fontSize="15px">{`${user.account?.energy} / ${user.account?.max_energy}`}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AccountTable;
