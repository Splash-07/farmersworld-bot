import { Box, ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import "@fontsource/m-plus-rounded-1c";

import Home from "./page/Home";
import Header from "./components/Header";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#202023",
        color: "orange.50",
        fontFamily: `"M PLUS Rounded 1c", sans-serif`,
      },
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box h={"100vh"}>
        <Header />
        <Container maxW={"container.xl"}>
          <Home />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
