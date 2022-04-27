import TableWrapper from "./TableWrapper";
import ToolRow from "./ToolRow";
import { useAppSelector } from "../../hooks/store.hooks";

import { Flex, Grid, GridItem } from "@chakra-ui/react";
import CropRow from "./CropsRow";
import AnimalRow from "./AnimalRow";
import MbsRow from "./MbsRow";
import { sortByType } from "../../utils/utils";

const ItemTables = () => {
  const items = useAppSelector((state) => state.data.items);

  const sortedToolList = sortByType(items.toolsList);

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
        {sortedToolList.length > 0 && (
          <TableWrapper tableName="Tools">
            {sortedToolList.map((tool) => (
              <ToolRow item={tool} mbs={items.mbsList} />
            ))}
          </TableWrapper>
        )}
        {items.cropsList.length > 0 && (
          <TableWrapper tableName="Crops">
            {items.cropsList.map((crop) => (
              <CropRow item={crop} />
            ))}
          </TableWrapper>
        )}
        {items.animalsList.length > 0 && (
          <TableWrapper tableName="Animals">
            {items.animalsList.map((animal) => (
              <AnimalRow item={animal} />
            ))}
          </TableWrapper>
        )}
        {items.mbsList.length > 0 && (
          <TableWrapper tableName="Mbs">
            {items.mbsList.map((mbs) => (
              <MbsRow item={mbs} />
            ))}
          </TableWrapper>
        )}
      </Grid>
    </Grid>
  );
};

export default ItemTables;
