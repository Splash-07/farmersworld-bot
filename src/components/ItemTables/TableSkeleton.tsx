import TableWrapper from "./TableWrapper";
import RowSkeleton from "./RowSkeleton";

import { Flex, Grid, GridItem } from "@chakra-ui/react";

const TableOnLoad = () => {
  const blankArray = Array.from({ length: 10 });

  return (
    <Grid
      width="100%"
      backgroundColor="whiteAlpha.100"
      alignContent="flex-start"
      alignSelf="flex-start"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      overflowX="auto"
      w="100%"
      maxW="450px"
    >
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        textAlign={"center"}
      >
        <Flex w="100%" justifyContent="center">
          Asset name
        </Flex>
        <Flex justifyContent="center" textAlign="center" w="50%">
          Timer
        </Flex>
        <Flex justifyContent="center" textAlign="center" w="50%">
          Stored
        </Flex>
      </GridItem>
      <Grid
        marginTop="10px"
        gap="10px"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "3px",
            borderRadius: "8px",
            backgroundColor: `whiteAlpha.100`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `whiteAlpha.300`,
          },
        }}
      >
        <TableWrapper tableName="Assets">
          {blankArray.map((_, index) => (
            <RowSkeleton key={index} />
          ))}
        </TableWrapper>
      </Grid>
    </Grid>
  );
};

export default TableOnLoad;
