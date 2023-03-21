import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const features = [
  {
    id: 1,
    title: "Fotovoltaica y Energía Solar",
    text: "Conoce la tecnología que convierte la luz solar en electricidad",
  },
  {
    id: 2,
    title: "Energía eólica",
    text: "Descubre cómo se puede aprovechar la energía eólica para generar electricidad",
  },
  {
    id: 3,
    title: "energía hidroeléctrica",
    text: "Explore la tecnología detrás de la generación de energía hidroeléctrica",
  },
  {
    id: 4,
    title: "Geothermal Energy",
    text: "Aprende sobre el uso del calor de la Tierra para generar electricidad",
  },
  {
    id: 5,
    title: "Bioenergía",
    text: "Descubra cómo se puede utilizar la biomasa, los biocombustibles y el biogás para generar energía",
  },
  {
    id: 6,
    title: "Energía renovable",
    text: "Esta sección contiene información sobre varias formas de energía renovable.",
  },
];

export default function GridListWithHeading() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>
          Proyectos Abiertos de Tecnología Sostenible
        </Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Una lista seleccionada de proyectos de tecnología abierta para
          mantener un clima estable, suministro de energía, biodiversidad y
          recursos naturales.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {features.map((feature) => (
            <Box key={feature.id}>
              <HStack align={"top"}>
                <Box color={"green.400"} px={2}>
                  <Icon as={CheckIcon} />
                </Box>
                <VStack align={"start"}>
                  <Text fontWeight={600}>{feature.title}</Text>
                  <Text color={"gray.600"}>{feature.text}</Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
