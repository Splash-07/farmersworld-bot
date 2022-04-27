import { Box, Container } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      className="header"
      w="100%"
      display={"flex"}
      alignContent="center"
      textAlign="center"
      justifyContent="center"
      h="50px"
    >
      <Container
        display={"flex"}
        alignContent="center"
        justifyContent={"center"}
      >
        <Box
          alignSelf="center"
          fontWeight="700"
          fontSize={"lg"}
          textTransform="uppercase"
        >
          Farmersworld bot
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
