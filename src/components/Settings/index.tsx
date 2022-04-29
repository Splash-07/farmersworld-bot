import { useAppSelector } from "../../hooks/store.hooks";
import CustomInput from "./CustomInput";
import SettingsBar from "./SettingsBar";

import {
  setMinEnergy,
  setMinRepair,
  toggleEnergy,
  toggleFeedChickens,
  toggleFeedDairyCows,
  toggleMbsStore,
  toggleRepair,
} from "../../store/slices/settings.slice";

import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";

const Settings = () => {
  const resources = useAppSelector((state) => state.data.resources);
  const settings = useAppSelector((state) => state.settings);

  return (
    <Flex
      justifyContent="center"
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      flexDir="column"
      gap="15px"
      w="50%"
    >
      <Text textTransform="uppercase" alignSelf="center" fontWeight="semibold">
        Settings
      </Text>
      <Wrap flexDir="column">
        <WrapItem w="100%">
          <SettingsBar
            dispatchedAction={toggleRepair}
            isDisabled={settings.repairIsDisabled}
          >
            <CustomInput
              isDisabled={settings.repairIsDisabled}
              maxPossible={90}
              type="Repair tool when <"
              initialValue={settings.minRepair}
              dispatchAction={setMinRepair}
            />
          </SettingsBar>
        </WrapItem>
        <WrapItem w="100%">
          <SettingsBar
            dispatchedAction={toggleEnergy}
            isDisabled={settings.energyIsDisabled}
          >
            <CustomInput
              isDisabled={settings.energyIsDisabled}
              maxPossible={resources?.max_energy! - 50}
              type="Restore energy when <"
              initialValue={settings.minEnergy}
              dispatchAction={setMinEnergy}
            />
          </SettingsBar>
        </WrapItem>
        <WrapItem w="100%">
          <SettingsBar
            dispatchedAction={toggleMbsStore}
            isDisabled={settings.mbsStoreIsDisabled}
          >
            <Box
              backgroundColor="whiteAlpha.100"
              color={
                settings.mbsStoreIsDisabled ? "whiteAlpha.400" : "orange.50"
              }
              padding="0 12px"
              border="1px solid"
              backdropBlur="lg"
              borderColor="whiteAlpha.100"
              boxShadow="md"
              lineHeight="30px"
              fontSize="14px"
              minW="175px"
            >
              Store mbs cards
            </Box>
          </SettingsBar>
        </WrapItem>
        <WrapItem w="100%">
          <SettingsBar
            dispatchedAction={toggleFeedDairyCows}
            isDisabled={settings.feedDairyCowIsDisabled}
          >
            <Box
              backgroundColor="whiteAlpha.100"
              color={
                settings.feedDairyCowIsDisabled ? "whiteAlpha.400" : "orange.50"
              }
              padding="0 12px"
              border="1px solid"
              backdropBlur="lg"
              borderColor="whiteAlpha.100"
              boxShadow="md"
              lineHeight="30px"
              fontSize="14px"
              minW="175px"
            >
              Feed Dairy Cows
            </Box>
          </SettingsBar>
        </WrapItem>
        <WrapItem w="100%">
          <SettingsBar
            dispatchedAction={toggleFeedChickens}
            isDisabled={settings.feedChickenIsDisabled}
          >
            <Box
              backgroundColor="whiteAlpha.100"
              color={
                settings.feedChickenIsDisabled ? "whiteAlpha.400" : "orange.50"
              }
              padding="0 12px"
              border="1px solid"
              backdropBlur="lg"
              borderColor="whiteAlpha.100"
              boxShadow="md"
              lineHeight="30px"
              fontSize="14px"
              minW="175px"
            >
              Feed Chickens
            </Box>
          </SettingsBar>
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Settings;
