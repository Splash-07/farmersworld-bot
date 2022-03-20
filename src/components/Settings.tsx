import { Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { setDurability, setEnergy } from "../store/slices/settings.slice";
import { RootState } from "../store/store";
import CustomInput from "./CustomInput";

const Settings = () => {
  const { minDurability, minEnergy, minFood } = useSelector((state: RootState) => state.settings);
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
      <Wrap flexWrap="wrap" justify="space-evenly">
        <WrapItem>
          <CustomInput type="Durability" initialValue={minDurability} dispatchAction={setDurability} />
        </WrapItem>
        <WrapItem>
          <CustomInput type="Energy" initialValue={minEnergy} dispatchAction={setEnergy} />
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Settings;
