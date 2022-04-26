import { CheckIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { FC, ReactChild } from "react";
import { useDispatch } from "react-redux";

interface CustomSettingBarInterface {
  isDisabled?: boolean;
  dispatchedAction: ActionCreatorWithoutPayload<string>;
  children: ReactChild;
}
const SettingBar: FC<CustomSettingBarInterface> = ({
  isDisabled,
  dispatchedAction,
  children,
}) => {
  const dispatch = useDispatch();

  return (
    <Flex alignItems="center" gap="10px">
      <IconButton
        size="sm"
        backdropBlur="lg"
        backgroundColor="whiteAlpha.100"
        borderColor="whiteAlpha.300"
        _hover={{ bg: "whiteAlpha.300" }}
        _focus={{ outlineColor: "orange.50", outlineWidth: "1px" }}
        boxShadow="md"
        aria-label="check"
        icon={<CheckIcon color={isDisabled ? "whiteAlpha.50" : "green.500"} />}
        onClick={() => dispatch(dispatchedAction())}
      />
      {children}
    </Flex>
  );
};

export default SettingBar;
