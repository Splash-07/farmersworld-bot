import { Flex, Input, InputGroup, InputLeftAddon, InputRightAddon, useMediaQuery } from "@chakra-ui/react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

interface CustomInputInterface {
  initialValue: number;
  isDisabled: boolean;
  type: string;
  dispatchAction: ActionCreatorWithPayload<any, string>;
  maxPossible: number;
}
const CustomInput: FC<CustomInputInterface> = ({ isDisabled, initialValue, type, dispatchAction, maxPossible }) => {
  const dispatch = useDispatch();

  const [breakPoint480] = useMediaQuery("(min-width: 480px)");
  const [value, setValue] = useState<string>(initialValue.toString());

  const dispatchValue = useMemo(
    () =>
      debounce((value) => {
        if (value.length === 0) {
          dispatch(dispatchAction(0));
        } else {
          dispatch(dispatchAction(parseInt(value)));
        }
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
          borderColor="whiteAlpha.200"
          boxShadow="md"
          fontWeight="medium"
          color={isDisabled ? "whiteAlpha.400" : "orange.50"}
          width={breakPoint480 ? "unset" : "100px"}
          minWidth={breakPoint480 ? "158px" : "unset"}
          isTruncated
        />
        <Input
          focusBorderColor="orange.100"
          borderColor="whiteAlpha.200"
          boxShadow="md"
          type="number"
          placeholder="0"
          isDisabled={isDisabled}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length === 0) return setValue(value);
            if (parseInt(value) <= maxPossible) {
              setValue(value);
              dispatchValue(value);
            } else {
              setValue(maxPossible.toString());
              dispatchValue(maxPossible.toString());
            }
          }}
        />
        {type.includes("Repair") && (
          <InputRightAddon
            children="%"
            backdropBlur="lg"
            backgroundColor="whiteAlpha.100"
            borderColor="whiteAlpha.200"
            boxShadow="md"
            fontWeight="medium"
          />
        )}
      </InputGroup>
    </Flex>
  );
};

export default CustomInput;
