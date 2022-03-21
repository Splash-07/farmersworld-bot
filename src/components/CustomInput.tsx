import { CheckIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, InputGroup, InputLeftAddon, InputRightAddon, useMediaQuery } from "@chakra-ui/react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

interface CustomInputInterface {
  initialValue: number;
  type: string;
  dispatchAction: ActionCreatorWithPayload<any, string>;
}
const CustomInput: FC<CustomInputInterface> = ({ initialValue, type, dispatchAction }) => {
  const [breakPoint480] = useMediaQuery("(min-width: 480px)");
  const [value, setValue] = useState<string>(initialValue.toString());
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dispatchValue = useMemo(
    () =>
      debounce((value) => {
        setIsDebouncing(true);
        if (value.length === 0) {
          dispatch(dispatchAction(0));
        } else {
          dispatch(dispatchAction(parseInt(value)));
        }
        setTimeout(() => {
          setIsDebouncing(false);
          setIsSuccess(true);
        }, 1000);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }, 1000),
    []
  );
  return (
    <Flex width="100%" alignItems="center" gap="10px">
      <InputGroup size="sm" fontSize="14px">
        <InputLeftAddon
          children={type}
          backdropBlur="lg"
          backgroundColor="whiteAlpha.100"
          borderColor="whiteAlpha.300"
          boxShadow="md"
          fontWeight="medium"
          width={breakPoint480 ? "unset" : "100px"}
          isTruncated
        />
        <Input
          focusBorderColor="orange.100"
          borderColor="whiteAlpha.300"
          boxShadow="md"
          type="number"
          placeholder="0"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            dispatchValue(e.target.value);
          }}
        />
        {type.includes("Durability") && (
          <InputRightAddon
            children="%"
            backdropBlur="lg"
            backgroundColor="whiteAlpha.100"
            borderColor="whiteAlpha.300"
            boxShadow="md"
            fontWeight="medium"
          />
        )}
      </InputGroup>

      <IconButton
        size="sm"
        backdropBlur="lg"
        backgroundColor="whiteAlpha.100"
        borderColor="whiteAlpha.300"
        boxShadow="md"
        aria-label="check"
        isLoading={isDebouncing}
        icon={<CheckIcon color={isSuccess ? "green.500" : "whiteAlpha.50"} />}
      ></IconButton>
    </Flex>
  );
};

export default CustomInput;
