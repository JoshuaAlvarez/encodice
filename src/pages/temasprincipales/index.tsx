import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Suggestions from "../../components/Topic/Suggestions";

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text color={"brand.100"} as={"span"}>
              Temas por popularidad
            </Text>{" "}
          </Heading>
          <Suggestions />
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={"images/jason-pischke-TYrQCzejRxE-unsplash.jpg"}
        />
      </Flex>
    </Stack>
  );
}
