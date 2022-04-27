import { useAppSelector } from "../../hooks/store.hooks";
import { waxInit } from "../../service/wax.service";

import { Button, Flex } from "@chakra-ui/react";

const LoginButton = () => {
  const currentEndpoint = useAppSelector(
    (state) => state.endpoint.currentEndpoint
  );

  return (
    <Flex>
      <Button
        onClick={() => waxInit(currentEndpoint)}
        bg="whiteAlpha.100"
        color="orange.50"
        padding="20px 30px"
        margin="50px auto"
        _hover={{ bg: "whiteAlpha.300", color: "orange.100" }}
        _focus={{ outlineColor: "orange.50", outlineWidth: "1px" }}
      >
        Login with WAX.Wallet
      </Button>
    </Flex>
  );
};

export default LoginButton;
