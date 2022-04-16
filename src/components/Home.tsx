import { Box, Button, Flex, useMediaQuery } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { login } from "../service/wax";
import { RootState } from "../store/store";

import AccountTable from "./AccountTable";
import Logger from "./Logger";
import NextAction from "./NextAction";
import Settings from "./Settings";
import ItemList from "./ItemList";
import AccountChest from "./AccountChest";
import AccountResources from "./AccountResources";
import Ad from "./Ad";
const Home = () => {
  const [breakPoint720] = useMediaQuery("(min-width: 720px)");
  const { username } = useSelector((state: RootState) => state.user);

  if (!username)
    return (
      <Box display={"flex"} alignContent="center" justifyContent="center" gap="20px" marginTop="30px">
        <Button
          onClick={login}
          bg={"whiteAlpha.100"}
          color={"orange.50"}
          _hover={{ bg: "whiteAlpha.300", color: "orange.100" }}
          _focus={{ outlineColor: "orange.50", outlineWidth: "1px" }}
          padding="20px 30px"
        >
          Login with WAX.Wallet
        </Button>
      </Box>
    );
  return (
    <Flex direction="column" marginTop="20px" gap="30px">
      <Flex gap="20px" flexDir="row">
        <AccountTable />
        <Flex gap="10px" flexDir="column" w="100%">
          <AccountChest />
          <AccountResources />
        </Flex>
      </Flex>
      <Flex justifyContent="center" gap="20px" flexWrap={breakPoint720 ? "unset" : "wrap"}>
        <ItemList />
        <Flex flexDir="column" alignContent="flex-start" gap="20px" width="100%">
          <NextAction />
          <Flex gap="20px">
            <Settings />
            <Ad />
          </Flex>
          <Flex
            gap="20px"
            direction="column"
            backgroundColor="whiteAlpha.100"
            borderRadius="md"
            padding="3"
            boxShadow="md"
          >
            <Logger />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
