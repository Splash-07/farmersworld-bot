import { Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { setMinEnergy, setMinRepair, toggleEnergy, toggleRepair } from "../store/slices/settings.slice";
import { RootState } from "../store/store";
import CustomInput from "./CustomInput";

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
          <CustomInput
            dispatchToggle={toggleRepair}
            isDisabled={settings.repairIsDisabled}
            minPossible={0}
            maxPossible={90}
            type="Repair tool when <"
            initialValue={settings.minRepair}
            dispatchAction={setMinRepair}
          />
        </WrapItem>
        <WrapItem width="100%">
          <CustomInput
            dispatchToggle={toggleEnergy}
            isDisabled={settings.energyIsDisabled}
            minPossible={50}
            maxPossible={user.account?.max_energy! - 50}
            type="Restore energy when <"
            initialValue={settings.minEnergy}
            dispatchAction={setMinEnergy}
          />
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Settings;
