import { Box, Button, Flex, useMediaQuery } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { wax } from "../service/wax";
import { login } from "../store/slices/user.slice";
import { RootState } from "../store/store";
import AccountTable from "./AccountTable";

import NextAction from "./NextAction";
import Settings from "./Settings";
import ToolsList from "./ToolsList";
const Home = () => {
  const [breakPoint720] = useMediaQuery("(min-width: 720px)");

  const { username } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const username = await wax.login();
      dispatch(login(username));
    } catch (error) {}
  }

  if (!username)
    return (
      <Box display={"flex"} alignContent="center" justifyContent="center" gap="20px" marginTop="30px">
        <Button onClick={handleLogin} bg={"orange.100"} color={"gray.900"} padding="20px 30px">
          Login with WAX.Wallet
        </Button>
      </Box>
    );
  return (
    <Flex direction="column" marginTop="30px" gap="30px">
      <AccountTable />
      <Flex justifyContent="center" gap="30px" flexWrap={breakPoint720 ? "unset" : "wrap"}>
        <ToolsList />
        <Flex
          alignSelf="flex-start"
          flexDir="column"
          gap="20px"
          width="100%"
          alignItems={breakPoint720 ? "unset" : "center"}
        >
          <NextAction />
          <Settings />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
