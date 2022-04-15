import { Flex, Image, Link, Text } from "@chakra-ui/react";
import DiscordAvatar from "../assets/icons/discord-icon-profile.jpg";
const Ad = () => {
  return (
    <Flex
      backgroundColor="whiteAlpha.100"
      borderRadius="md"
      padding="3"
      boxShadow="md"
      flexDir="column"
      gap="15px"
      w="50%"
    >
      <Text textTransform="uppercase" alignSelf="center" fontWeight="semibold">
        Contacts
      </Text>
      <Flex flexDir="column" gap="10px">
        <Flex
          gap="4px"
          alignItems="center"
          paddingTop="1"
          paddingBottom="1"
          paddingLeft="4"
          paddingRight="4"
          borderRadius="md"
          boxShadow="md"
          backgroundColor="whiteAlpha.100"
        >
          <Text>My discord -</Text>
          <Link href="#" color="#feebc8" fontWeight="semibold">
            Shrixy#9453
          </Link>
          <Image w="32px" borderRadius="50%" src={DiscordAvatar} boxShadow="md"></Image>
        </Flex>
        <Flex
          gap="4px"
          paddingTop="1"
          paddingBottom="1"
          paddingLeft="4"
          paddingRight="4"
          borderRadius="md"
          boxShadow="md"
          backgroundColor="whiteAlpha.100"
        >
          <Text>Discord channel -</Text>
          <Link href="#" color="#feebc8" fontWeight="semibold">
            TeamNoBot
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Ad;
