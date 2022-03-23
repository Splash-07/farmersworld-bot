import { Box, Flex, Image, Slider, SliderFilledTrack, SliderTrack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAccountData, getMbsData, getResourcesData, getToolsData } from "../service/fmdata";
import { RootState } from "../store/store";

import woodIcon from "../assets/icons/wood-icon.png";
import meatIcon from "../assets/icons/meat-icon.png";
import goldIcon from "../assets/icons/gold-icon.png";
import energyIcon from "../assets/icons/energy-icon.png";
import { pushLog, toggleUpdateData } from "../store/slices/settings.slice";
import { setNextAction } from "../store/slices/user.slice";

const balanceIcons = [woodIcon, goldIcon, meatIcon, energyIcon];

const AccountTable = () => {
  const { user, settings } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  // fetch account data on mount
  useEffect(() => {
    (async () => {
      dispatch(toggleUpdateData(true));
      const log = `Logged in. Hello, <strong><span style="color: #feebc8;">${user.username}</span></strong>`;
      dispatch(pushLog(log));
    })();
  }, []);

  // Trigger data fetch each 30 sec
  useEffect(() => {
    if (settings.updateData === true) {
      const updateDataInterval = setInterval(() => {
        dispatch(toggleUpdateData(false));
        dispatch(toggleUpdateData(true));
      }, 30000);
      return () => {
        clearInterval(updateDataInterval);
      };
    }
  }, [settings.updateData]);

  // fetch data on updateFarm toggle
  useEffect(() => {
    if (settings.updateData === true) {
      (async () => {
        if (user.username) {
          Promise.all([
            getAccountData(user.username),
            getResourcesData(user.username),
            getToolsData(user.username),
            getMbsData(user.username),
          ]).then(async (result) => {
            console.log(result);
            dispatch(setNextAction());
          });
        }
      })();
    }
  }, [settings.updateData]);

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

      <Flex flexDir="column" gap="10px" maxWidth="350px" width="100%">
        <Flex gap="5px" justifyContent="space-evenly">
          <Box>{`CPU: ${Math.ceil((user.account?.cpuUsed! / user.account?.cpuMax!) * 100)}%`}</Box>
          <Box>{`Stacking: ${user.account?.waxStackedOnCpu}W`}</Box>
        </Flex>
        <Slider
          aria-label="slider-ex-1"
          value={user.account ? Math.ceil((user.account?.cpuUsed! / user.account?.cpuMax!) * 100) : 0}
          isDisabled
          colorScheme="green"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
      </Flex>
      <Flex gap="20px" justifyContent="space-evenly" w="100%" flexWrap="wrap">
        {user.resources &&
          Object.entries(user.resources.balances).map((type, index) => (
            <Box key={type[0]} display="flex" gap="15px" alignContent="center" alignItems="center">
              <Image w="32px" src={balanceIcons[index]} />
              <Text fontSize="15px">{`${type[1].toFixed(2)}`}</Text>
            </Box>
          ))}
        <Box display="flex" gap="15px" alignContent="center" alignItems="center">
          <Image w="32px" src={energyIcon} />
          <Text fontSize="15px">{`${user.resources?.energy} / ${user.resources?.max_energy}`}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AccountTable;
