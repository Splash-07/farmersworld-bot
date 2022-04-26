import { Flex, Text } from "@chakra-ui/react";
import parse from "html-react-parser";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const Logger = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logBox = log.current!;
    if (logBox.scrollTop + logBox.clientHeight >= logBox.scrollHeight - 80) {
      logBox.scrollTo(0, logBox.scrollHeight);
    }
  }, [settings.loggerArray]);

  return (
    <>
      <Text textTransform="uppercase" alignSelf="center" fontWeight="semibold">
        Logger
      </Text>
      <Flex
        ref={log}
        height="350px"
        direction="column"
        backgroundColor="whiteAlpha.100"
        borderRadius="md"
        padding="3"
        boxShadow="inner"
        border="1px solid"
        borderColor="whiteAlpha.200"
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
        <Flex direction="column" gap="5px">
          {settings.loggerArray.map((log, index) => (
            <Text key={index}>{parse(log)}</Text>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Logger;
