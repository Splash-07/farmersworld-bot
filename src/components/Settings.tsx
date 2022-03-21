import { Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { setDurability, setEnergy } from "../store/slices/settings.slice";
import { RootState } from "../store/store";
import CustomInput from "./CustomInput";

const Settings = () => {
  const { minDurability, minEnergy } = useSelector((state: RootState) => state.settings);
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
          <CustomInput type="Durability restore when <" initialValue={minDurability} dispatchAction={setDurability} />
        </WrapItem>
        <WrapItem width="100%">
          <CustomInput type="Energy restore when <" initialValue={minEnergy} dispatchAction={setEnergy} />
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Settings;
