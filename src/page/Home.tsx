import Logger from "../components/Logger";
import NextAction from "../components/NextAction";
import Settings from "../components/Settings";
import Ad from "../components/Ad";
import Endpoints from "../components/Endpoints";
import LoginButton from "../components/LoginButton";

import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "../hooks/store.hooks";
import ItemTables from "../components/ItemTables";
import AccountInfo from "../components/Account";

const Home = () => {
  const username = useAppSelector((state) => state.data.username);

  if (!username) return <LoginButton />;

  return (
    <Flex direction="column" marginTop="20px" gap="20px">
      <AccountInfo />
      <Flex justifyContent="center" gap="20px">
        <ItemTables />
        <Flex
          flexDir="column"
          alignContent="flex-start"
          gap="10px"
          width="100%"
        >
          <NextAction />
          <Flex gap="10px">
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
          <Endpoints />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
