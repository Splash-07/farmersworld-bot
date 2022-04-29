import { ReactNode } from "react";
import { GridItem, Text } from "@chakra-ui/react";

const TableWrapper = ({
  tableName,
  children,
}: {
  tableName: string;
  children: ReactNode;
}) => {
  return (
    <GridItem
      padding="2"
      borderRadius="md"
      boxShadow="md"
      backgroundColor="whiteAlpha.100"
    >
      <Text
        textAlign="center"
        textTransform="uppercase"
        paddingTop="1"
        paddingBottom="1"
        paddingLeft="4"
        paddingRight="4"
        borderRadius="md"
        boxShadow="md"
        backgroundColor="whiteAlpha.100"
        marginBottom="10px"
      >
        {tableName}
      </Text>
      {children}
    </GridItem>
  );
};

export default TableWrapper;
