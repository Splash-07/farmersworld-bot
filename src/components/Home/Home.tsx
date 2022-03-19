import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wax } from "../../service/wax";
import { login } from "../../store/slices/user.slice";
import { RootState } from "../../store/store";
import AccountTable from "./AccountTable";

import NextAction from "./NextAction";
const Home = () => {
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
        <Button onClick={handleLogin} bg={"orange.50"} color={"gray.900"} padding="20px 30px">
          Login
        </Button>
      </Box>
    );
  return (
    <Box marginTop="30px">
      <AccountTable />
      <NextAction />
    </Box>
  );
};

export default Home;
