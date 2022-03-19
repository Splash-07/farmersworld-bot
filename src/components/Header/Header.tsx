import { Box, Container } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box className="header" w="100%" display={"flex"} alignContent="center" justifyContent={"center"} h="50px">
      <Container display={"flex"} alignContent="center" justifyContent={"center"}>
        <Box alignSelf="center" fontWeight="700" fontSize={"lg"} textTransform="uppercase">
          Farmersworld claim bot
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
