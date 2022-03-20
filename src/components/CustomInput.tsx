import { CheckIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement } from "@chakra-ui/react";
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
  const [value, setValue] = useState<string>(initialValue.toString());

  const dispatch = useDispatch();
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
    <InputGroup size="sm" fontSize="14px" width="100%" maxWidth="190px">
      <InputLeftAddon
        children={type}
        backdropBlur="lg"
        backgroundColor="whiteAlpha.100"
        borderColor="whiteAlpha.300"
        boxShadow="md"
        fontWeight="medium"
        width="90px"
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
      {/* {dispatchValue && <InputRightElement children={<CheckIcon color="green.500" />} />} */}
      {type === "Durability" && (
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
  );
};

export default CustomInput;
