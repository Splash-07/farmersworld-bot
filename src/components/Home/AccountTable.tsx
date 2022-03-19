import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTableRow } from "../../service/fmdata";
import { getAccount, getTools } from "../../store/slices/user.slice";
import { RootState } from "../../store/store";
import { TableRowEnums } from "../../types/data.types";

import woodIcon from "../../assets/icons/wood-icon.png";
import meatIcon from "../../assets/icons/meat-icon.png";
import goldIcon from "../../assets/icons/gold-icon.png";
import energyIcon from "../../assets/icons/energy-icon.png";
const balanceIcons = [woodIcon, goldIcon, meatIcon];

const AccountTable = () => {
  const { username, account } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const account = await getTableRow(username!, TableRowEnums.accounts);
      dispatch(getAccount(account));
    }
    getData();
  }, []);
  return (
    <Flex flexDir={"column"} justify="center" align={"center"} gap="20px">
      <Text>{`Logged in as ${username}`}</Text>
      <Flex gap={"20px"}>
        {account?.balances.map((type, index) => (
          <Box key={type} display={"flex"} gap="20px" alignContent={"center"} alignItems="center">
            <Image w="32px" src={balanceIcons[index]} className="item__icon" />
            <Text className="item__text">{type}</Text>
          </Box>
        ))}
        <Box display={"flex"} gap="20px" alignContent={"center"} alignItems="center">
          <Image w="32px" src={energyIcon} className="item__icon" />
          <Text className="item__text">{`${account?.energy} / ${account?.max_energy}`}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AccountTable;
