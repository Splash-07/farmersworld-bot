import {
  Box,
  Flex,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAccountData,
  getAnimalsData,
  getAssetsInStash,
  getBreedingsData,
  getCropsData,
  getMbsData,
  getResourcesData,
  getToolsData,
} from "../service/dataHandlers";
import { RootState } from "../store/store";

import {
  pushLog,
  triggerNextAction,
  toggleUpdateData,
} from "../store/slices/settings.slice";
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
  }, [settings.updateData, dispatch]);

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
            getCropsData(user.username),
            getBreedingsData(user.username),
            getAnimalsData(user.username),
            getAssetsInStash(user.username),
          ])
            .then(async (result) => {
              console.log(result);
              dispatch(setNextAction(settings));
              dispatch(triggerNextAction(false));
            })
            .catch(async (error: any) => {
              console.log(
                "Some of data fetch functions has been rejected, changing server"
              );
              await changeEndpoint();
              dispatch(toggleUpdateData(false));
              await sleep(1000);
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
      w="65%"
      maxWidth="450px"
    >
      <Flex gap="5px">
        <Text>Logged in as</Text>
        <Text color="orange.100" fontWeight="semibold">
          {user.username}
        </Text>
      </Flex>

      <Flex gap="5px">
        <Text>Current RPC endpoint -</Text>
        <Text color="#FEB2B2" fontWeight="semibold">
          {settings.currentServer}
        </Text>
      </Flex>

      <Flex flexDir="column" gap="10px" maxWidth="350px" width="100%">
        <Flex gap="5px" justifyContent="space-evenly">
          {!user.account ? (
            <Skeleton>
              <Box>some text</Box>
            </Skeleton>
          ) : (
            <Box>{`CPU: ${Math.ceil(
              (user.account?.cpuUsed! / user.account?.cpuMax!) * 100
            )}%`}</Box>
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
          value={
            user.account
              ? Math.ceil(
                  (user.account?.cpuUsed! / user.account?.cpuMax!) * 100
                )
              : 0
          }
          isDisabled
          colorScheme="green"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
      </Flex>
    </Flex>
  );
};

export default AccountTable;
