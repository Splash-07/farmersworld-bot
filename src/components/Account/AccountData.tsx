import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useAppThunkDispatch,
} from "../../hooks/store.hooks";
import {
  pushLog,
  toggleUpdateData,
  triggerNextAction,
} from "../../store/slices/settings.slice";
import { rpc, handleEndpointManipulations } from "../../service/wax.service";
import { getAllData, setNextAction } from "../../store/slices/data.slice";
import { swapEndpoint } from "../../store/slices/endpoint.slice";

import {
  Box,
  Flex,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Text,
} from "@chakra-ui/react";

const AccountTable = () => {
  const username = useAppSelector((state) => state.data.username);
  const accountInfo = useAppSelector((state) => state.data.accountInfo);
  const settings = useAppSelector((state) => state.settings);
  const endpoint = useAppSelector((state) => state.endpoint);

  const dispatch = useAppDispatch();
  const thunkDispatch = useAppThunkDispatch();

  // fetch account data on mount
  useEffect(() => {
    dispatch(toggleUpdateData(true));
    if (username) {
      const log = `Logged in. Hello, <strong><span style="color: #feebc8;">${username}</span></strong>`;
      dispatch(pushLog(log));
    }
  }, []);

  // Trigger data fetch each 30 sec
  useEffect(() => {
    const updateDataInterval = setInterval(() => {
      dispatch(toggleUpdateData(true));
    }, 30000);
    return () => {
      clearInterval(updateDataInterval);
    };
  }, [settings.updateData, dispatch]);

  // fetch data on updateFarm toggle
  useEffect(() => {
    if (settings.updateData === true) {
      if (!username) return;
      (async () => {
        // Action will not perform, until data fetched correctly
        try {
          const dataResult = await thunkDispatch(
            getAllData({ rpc, username })
          ).unwrap();
          if (dataResult) {
            dispatch(setNextAction(settings));
            dispatch(triggerNextAction(false));
          }
        } catch (error) {
          await handleEndpointManipulations(swapEndpoint, "SWAP");
          dispatch(toggleUpdateData(false));
          dispatch(toggleUpdateData(true));
        }
        dispatch(toggleUpdateData(false));
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
          {!accountInfo ? (
            <Skeleton>
              <Box>some text</Box>
            </Skeleton>
          ) : (
            <Box>{`CPU: ${Math.ceil(
              (accountInfo?.cpuUsed! / accountInfo?.cpuMax!) * 100
            )}%`}</Box>
          )}
          {!accountInfo ? (
            <Skeleton>
              <Box>some text</Box>
            </Skeleton>
          ) : (
            <Box>{`Stacking: ${accountInfo?.waxStackedOnCpu}W`}</Box>
          )}
        </Flex>
        <Slider
          aria-label="slider-ex-1"
          value={
            accountInfo
              ? Math.ceil((accountInfo?.cpuUsed! / accountInfo?.cpuMax!) * 100)
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
