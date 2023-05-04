import { ReactNode } from "react";
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

export default function StatsGridWithImage() {
  return (
    <Box bg={"gray.800"} position={"relative"}>
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: "none", lg: "flex" }}
        backgroundImage="url('images/jeremy-bishop-EwKXn5CapA4-unsplash.jpg')"
        backgroundSize={"cover"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position={"absolute"}
        width={"50%"}
        insetY={0}
        right={0}
      >
        <Flex
          bgGradient={"linear(to-r, gray.800 10%, transparent)"}
          w={"full"}
          h={"full"}
        />
      </Flex>
      <Container maxW={"7xl"} zIndex={10} position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            color={"gray.400"}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={"xl"}
                color={"gray.500"}
              >
                Tecnología Abierta Sustentable
              </Text>
              <Heading
                color={"white"}
                mb={5}
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                Encodice
              </Heading>
              <Text fontSize={"xl"} color={"gray.400"}>
                Encodice es un sitio web compuesto por varios subgrupos basados
                en temas enfocados específicamente en prácticas y tecnologías de
                ingeniería sostenible que permite a su comunidad de usuarios
                interactuar a través de publicaciones. El sitio web proporciona
                una plataforma gratuita para que expertos y estudiantes
                compartan sus conocimientos, experiencias y preguntas.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={"heading"}
                    fontSize={"3xl"}
                    color={"white"}
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={"span"} fontWeight={700} color={"white"}>
    {children}
  </Text>
);

const stats = [
  {
    title: "Publicaciones constantes",
    content: (
      <>
        <StatsText>Los usuarios</StatsText> de Encodice tienen a su disposición
        un flujo constante de nuevas publicaciones de interés
      </>
    ),
  },
  {
    title: "Temas específicos",
    content: (
      <>
        <StatsText>Cada subgrupo</StatsText> está dedicado a un tema en
        particular logrando una mejor organización
      </>
    ),
  },
  {
    title: "Chatbot",
    content: (
      <>
        <StatsText>Creado mediante RASA</StatsText> nuestro Asistente Virtual
        puede responder preguntas acerca de la funcionalidad del sitio y sus
        temas
      </>
    ),
  },
  {
    title: "Microservicios",
    content: (
      <>
        <StatsText>Componentes clave</StatsText> de nuestra aplicación se basan
        en una arquitectura de microservicios desplegados mediante Cloud
        Funtions.
      </>
    ),
  },
];
