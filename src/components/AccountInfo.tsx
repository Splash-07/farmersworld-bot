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
import { handleEndpointManipulations } from "../service/wax";
import { swapEndpoint } from "../store/slices/endpoint.slice";

const AccountTable = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const account = useSelector((state: RootState) => state.user.account);
  const settings = useSelector((state: RootState) => state.settings);
  const endpoint = useSelector((state: RootState) => state.endpoint);

  const dispatch = useDispatch();

  // fetch account data on mount
  useEffect(() => {
    (async () => {
      dispatch(toggleUpdateData(true));
      if (username) {
        const log = `Logged in. Hello, <strong><span style="color: #feebc8;">${username}</span></strong>`;
        dispatch(pushLog(log));
      }
    })();
  }, [username]);

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
        if (username) {
          // / Action will not perform, until data fetched correctly
          Promise.all([
            getAccountData(username),
            getResourcesData(username),
            getToolsData(username),
            getMbsData(username),
            getCropsData(username),
            getBreedingsData(username),
            getAnimalsData(username),
            getAssetsInStash(username),
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
              await handleEndpointManipulations(swapEndpoint, "SWAP");
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
      w="100%"
      maxW="450px"
    >
      <Flex gap="5px">
        <Text>Logged in as</Text>
        <Text color="orange.100" fontWeight="semibold">
          {username}
        </Text>
      </Flex>
      <Flex gap="5px">
        <Text>Current RPC -</Text>
        <Text color="red.200" fontWeight="semibold">
          {endpoint.currentEndpoint.url.replace(/^(https?|ftp):\/\//, "")}
        </Text>
      </Flex>

      <Flex flexDir="column" gap="10px" maxWidth="350px" width="100%">
        <Flex gap="5px" justifyContent="space-evenly">
          {!account ? (
            <Skeleton>
              <Box>some text</Box>
            </Skeleton>
          ) : (
            <Box>{`CPU: ${Math.ceil(
              (account?.cpuUsed! / account?.cpuMax!) * 100
            )}%`}</Box>
          )}
          {!account ? (
            <Skeleton>
              <Box>some text</Box>
            </Skeleton>
          ) : (
            <Box>{`Stacking: ${account?.waxStackedOnCpu}W`}</Box>
          )}
        </Flex>
        <Slider
          aria-label="slider-ex-1"
          value={
            account
              ? Math.ceil((account?.cpuUsed! / account?.cpuMax!) * 100)
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
