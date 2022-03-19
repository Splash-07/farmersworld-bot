import "@fontsource/m-plus-rounded-1c";

import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "gray.900",
        color: "orange.50",
        fontFamily: "M PLUS Rounded 1c, sans-serif",
      },
      // styles for the `a`
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
      <div className="app">
        <Header />
        <Container maxW={"container.md"}>
          <Home />
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;
