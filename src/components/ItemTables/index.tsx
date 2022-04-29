import TableSkeleton from "./TableSkeleton";
import TableWrapper from "./TableWrapper";
import ToolRow from "./ToolRow";
import CropRow from "./CropsRow";
import AnimalRow from "./AnimalRow";
import MbsRow from "./MbsRow";
import { useAppSelector } from "../../hooks/store.hooks";
import { sortByType } from "../../utils/utils";

import { Flex, Grid, GridItem } from "@chakra-ui/react";

const ItemTables = () => {
  const data = useAppSelector((state) => state.data);

  const sortedToolList = data.toolsList && sortByType(data.toolsList);

  if (!data.toolsList) return <TableSkeleton />;

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
        {sortedToolList && (
          <TableWrapper tableName="Tools">
            {sortedToolList.map((tool, index) => (
              <ToolRow
                key={`${tool.template_id + tool.next_availability + index}`}
                item={tool}
                mbs={data.mbsList!}
              />
            ))}
          </TableWrapper>
        )}
        {data.cropsList && (
          <TableWrapper tableName="Crops">
            {data.cropsList?.map((crop, index) => (
              <CropRow
                key={`${crop.template_id + crop.next_availability + index}`}
                item={crop}
              />
            ))}
          </TableWrapper>
        )}
        {data.animalsList && (
          <TableWrapper tableName="Animals">
            {data.animalsList.map((animal, index) => (
              <AnimalRow
                key={`${animal.template_id + animal.next_availability + index}`}
                item={animal}
              />
            ))}
          </TableWrapper>
        )}
        {data.mbsList && (
          <TableWrapper tableName="Mbs">
            {data.mbsList.map((mbs, index) => (
              <MbsRow
                key={`${mbs.template_id + mbs.next_availability + index}`}
                item={mbs}
              />
            ))}
          </TableWrapper>
        )}
      </Grid>
    </Grid>
  );
};

export default ItemTables;
