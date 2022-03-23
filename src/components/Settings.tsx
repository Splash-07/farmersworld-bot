import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  setMinEnergy,
  setMinRepair,
  toggleEnergy,
  toggleRepair,
  toggleSoundNotification,
} from "../store/slices/settings.slice";
import { RootState } from "../store/store";
import CustomInput from "./CustomInput";
import SettingBar from "./SettingBar";

const Settings = () => {
  const { user, settings } = useSelector((state: RootState) => state);
  return (
    <Flex
      w="100%"
      justifyContent="center"
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      flexDir="column"
      gap="15px"
    >
      <Text textTransform="uppercase" alignSelf="center" fontWeight="semibold">
        Settings
      </Text>
      <Wrap flexDir="column">
        <WrapItem width="100%">
          <SettingBar dispatchToggle={toggleRepair} isDisabled={settings.repairIsDisabled}>
            <CustomInput
              isDisabled={settings.repairIsDisabled}
              maxPossible={90}
              type="Repair tool when <"
              initialValue={settings.minRepair}
              dispatchAction={setMinRepair}
            />
          </SettingBar>
        </WrapItem>
        <WrapItem width="100%">
          <SettingBar dispatchToggle={toggleEnergy} isDisabled={settings.energyIsDisabled}>
            <CustomInput
              isDisabled={settings.energyIsDisabled}
              maxPossible={user.resources?.max_energy! - 50}
              type="Restore energy when <"
              initialValue={settings.minEnergy}
              dispatchAction={setMinEnergy}
            />
          </SettingBar>
        </WrapItem>
        <WrapItem width="100%">
          <SettingBar dispatchToggle={toggleSoundNotification} isDisabled={settings.soundIsDisabled}>
            <Box
              backgroundColor="whiteAlpha.100"
              color={settings.soundIsDisabled ? "whiteAlpha.400" : "orange.50"}
              padding="0 12px"
              border="1px solid"
              backdropBlur="lg"
              borderColor="whiteAlpha.100"
              boxShadow="md"
              lineHeight="30px"
              fontSize="14px"
            >
              Claim sound notifications
            </Box>
          </SettingBar>
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Settings;
