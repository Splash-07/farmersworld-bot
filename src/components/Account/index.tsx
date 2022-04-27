import AccountData from "./AccountData";
import AccountChest from "./AccountChest";
import AccountResources from "./AccountResources";

import { Flex } from "@chakra-ui/react";
const AccountInfo = () => {
  return (
    <Flex gap="20px" flexDir="row">
      <AccountData />
      <Flex gap="10px" flexDir="column" w="100%">
        <AccountChest />
        <AccountResources />
      </Flex>
    </Flex>
  );
};

export default AccountInfo;
