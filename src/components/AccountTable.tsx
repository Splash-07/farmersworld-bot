import { Box, Flex, Image, Skeleton, Slider, SliderFilledTrack, SliderTrack, Text } from "@chakra-ui/react";
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
import { sleep } from "../utils/timers";
import { changeEndpoint } from "../service/wax";

const AccountTable = () => {
  const { user, settings } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  // fetch account data on mount
  useEffect(() => {
    (async () => {
      dispatch(toggleUpdateData(true));
      if (user.username) {
        const log = `Logged in. Hello, <strong><span style="color: #feebc8;">${user.username}</span></strong>`;
        dispatch(pushLog(log));
      }
    })();
  }, [user.username]);

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
          // / Action will not perform, untill data fetched correctly
          Promise.all([
            getAccountData(user.username),
            getResourcesData(user.username),
            getToolsData(user.username),
            getMbsData(user.username),
          ])
            .then(async (result) => {
              console.log(result);
              dispatch(setNextAction());
            })
            .catch(async (error: any) => {
              console.log("promise failed" + error);
              changeEndpoint();
              dispatch(toggleUpdateData(false));
              await sleep(4000);
              dispatch(toggleUpdateData(true));
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
          {!user.account ? (
            <Skeleton>
              <Box>some text</Box>
            </Skeleton>
          ) : (
            <Box>{`CPU: ${Math.ceil((user.account?.cpuUsed! / user.account?.cpuMax!) * 100)}%`}</Box>
          )}
          {!user.account ? (
            <Skeleton>
              <Box>some text</Box>
            </Skeleton>
          ) : (
            <Box>{`Stacking: ${user.account?.waxStackedOnCpu}W`}</Box>
          )}
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
        <Box display="flex" gap="15px" alignContent="center" alignItems="center">
          <Image w="32px" src={woodIcon} />
          {!user.resources ? (
            <Skeleton>
              <Text fontSize="15px">some text</Text>
            </Skeleton>
          ) : (
            <Text fontSize="15px">{`${user.resources?.balances.wood.toFixed(2)}`}</Text>
          )}
        </Box>
        <Box display="flex" gap="15px" alignContent="center" alignItems="center">
          <Image w="32px" src={goldIcon} />
          {!user.resources ? (
            <Skeleton>
              <Text fontSize="15px">some text</Text>
            </Skeleton>
          ) : (
            <Text fontSize="15px">{`${user.resources?.balances.gold.toFixed(2)}`}</Text>
          )}
        </Box>
        <Box display="flex" gap="15px" alignContent="center" alignItems="center">
          <Image w="32px" src={meatIcon} />
          {!user.resources ? (
            <Skeleton>
              <Text fontSize="15px">some text</Text>
            </Skeleton>
          ) : (
            <Text fontSize="15px">{`${user.resources?.balances.food.toFixed(2)}`}</Text>
          )}
        </Box>
        <Box display="flex" gap="15px" alignContent="center" alignItems="center">
          <Image w="32px" src={energyIcon} />
          {!user.resources ? (
            <Skeleton>
              <Text fontSize="15px">some text</Text>
            </Skeleton>
          ) : (
            <Text fontSize="15px">{`${user.resources?.energy} / ${user.resources?.max_energy}`}</Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AccountTable;
