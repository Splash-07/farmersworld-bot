import { AddIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  addEndpoint,
  changeEndpoint,
  deleteEndpoint,
  toggleEndpointStatus,
} from "../store/slices/endpoint.slice";
import { handleEndpointManipulations } from "../service/wax";

const Endpoints = () => {
  const { endpointsArray, currentEndpoint } = useSelector(
    (state: RootState) => state.endpoint
  );
  const dispatch = useDispatch();
  function handleAddNewServer() {
    const newUrl = prompt(
      'Add new server in format like this: "https://chain.wax.io"'
    );
    if (!newUrl) return;
    if (!newUrl?.match(/^(https?):\/\/.*/)) {
      return alert('Wrong format, new server address must include "https://"');
    }
    if (endpointsArray.some((endpoint) => endpoint.url === newUrl)) {
      return alert("This endpoint is already exist");
    }

    dispatch(addEndpoint({ url: newUrl, status: true }));
  }
  return (
    <Flex
      justify="space-evenly"
      gap={"10px"}
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="5"
      boxShadow="md"
      justifyContent="center"
      fontSize="15px"
      flexDir="column"
    >
      <Text textAlign="center" textTransform="uppercase" fontWeight="semibold">
        Endpoints
      </Text>
      <Button
        size="sm"
        backdropBlur="lg"
        backgroundColor="whiteAlpha.100"
        borderColor="whiteAlpha.300"
        _hover={{ bg: "whiteAlpha.300" }}
        _focus={{ outlineColor: "orange.50", outlineWidth: "1px" }}
        boxShadow="md"
        aria-label="check"
        onClick={() => handleAddNewServer()}
      >
        Add new RPC endpoint
      </Button>
      <Flex gap="10px" wrap="wrap" justifyContent="space-evenly">
        {endpointsArray.map((endpoint, index) => (
          <Flex alignItems="center" gap="10px" key={endpoint.url + index}>
            {endpointsArray.length > 1 && (
              <IconButton
                size="sm"
                backdropBlur="lg"
                backgroundColor="whiteAlpha.100"
                borderColor="whiteAlpha.300"
                _hover={{ bg: "whiteAlpha.300" }}
                _focus={{ outlineColor: "orange.50", outlineWidth: "1px" }}
                boxShadow="md"
                aria-label="check"
                icon={
                  <CheckIcon
                    color={endpoint.status ? "green.500" : "whiteAlpha.50"}
                  />
                }
                onClick={() =>
                  handleEndpointManipulations(toggleEndpointStatus, "TOGGLE", {
                    endpoint,
                    index,
                  })
                }
              />
            )}

            <Box
              backgroundColor="whiteAlpha.100"
              color={endpoint.status ? "orange.50" : "whiteAlpha.400"}
              padding="0 12px"
              border={
                currentEndpoint.url === endpoint.url
                  ? "1px solid #FEB2B2"
                  : "1px solid RGBA(0, 0, 0, 0.06)"
              }
              cursor="pointer"
              _hover={{ bg: "whiteAlpha.300" }}
              _focus={{ outlineColor: "orange.50", outlineWidth: "1px" }}
              boxShadow="md"
              lineHeight="30px"
              fontSize="14px"
              minW="175px"
              textAlign="center"
              onClick={() =>
                handleEndpointManipulations(changeEndpoint, "CHANGE", {
                  endpoint,
                  index,
                })
              }
            >
              {endpoint.url.replace(/^(https?|ftp):\/\//, "")}
            </Box>
            {endpointsArray.length > 1 && (
              <IconButton
                size="sm"
                backdropBlur="lg"
                backgroundColor="whiteAlpha.100"
                borderColor="whiteAlpha.300"
                _hover={{ bg: "whiteAlpha.300" }}
                _focus={{ outlineColor: "orange.50", outlineWidth: "1px" }}
                boxShadow="md"
                aria-label="check"
                icon={<DeleteIcon color="red.600" />}
                onClick={() =>
                  handleEndpointManipulations(deleteEndpoint, "DELETE", {
                    endpoint,
                    index,
                  })
                }
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Endpoints;
