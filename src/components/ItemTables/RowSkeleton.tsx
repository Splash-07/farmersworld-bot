import { Box, Flex, GridItem, Skeleton } from "@chakra-ui/react";

const RowOnLoad = () => {
  return (
    <GridItem
      marginBottom="5px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="100%"
    >
      <Box overflow="hidden" w="100%">
        <Skeleton>Some blank text</Skeleton>
      </Box>
      <Flex justifyContent="center" w="50%" fontSize="14px">
        <Skeleton>00:00:00</Skeleton>
      </Flex>
      <Flex justifyContent="center" w="50%" fontSize="14px">
        <Skeleton>0/0</Skeleton>
      </Flex>
    </GridItem>
  );
};

export default RowOnLoad;
