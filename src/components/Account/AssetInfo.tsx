import { FC } from "react";

import { Box, Image, Text } from "@chakra-ui/react";

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
      <Text fontSize="15px">{text}</Text>
    </Box>
  );
};

export default AssetInfo;
