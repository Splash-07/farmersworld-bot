import { FC } from "react";

import { Box, Image, Skeleton, Text } from "@chakra-ui/react";

interface AssetInfoProps {
  image: any;
  text?: string;
}

const AssetInfo: FC<AssetInfoProps> = ({ image, text }) => {
  return (
    <Box
      display="flex"
      gap="15px"
      alignItems="center"
      padding="1.5"
      borderRadius="md"
      boxShadow="md"
      backgroundColor="whiteAlpha.100"
    >
      <Image w="32px" src={image} />
      {text ? (
        <Text fontSize="15px">{text}</Text>
      ) : (
        <Skeleton width="100%">
          <Box width="100%">222</Box>
        </Skeleton>
      )}
    </Box>
  );
};

export default AssetInfo;
