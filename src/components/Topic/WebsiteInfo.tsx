import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";

const WebsiteInfo: React.FC = () => {
  return (
    <Flex
      direction={"column"}
      bg="white"
      borderRadius={4}
      border="1px solid"
      borderColor={"gray.300"}
    >
      <Flex
        align={"flex-end"}
        color="white"
        p="6px 10px"
        height={"70px"}
        borderRadius="4px 4px 0px 0px"
        fontWeight={700}
        bgImage="url(/images/pagTema.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('images/pagTema.png')"
      >
        ¿Qué es Encodice?
      </Flex>
      <Box
        p="6px 10px"
        width="250px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={350}
        fontSize="14px"
      >
        Encodice es un sitio web compuesto por varios subgrupos basados en temas
        específicos enfocados específicamente en prácticas y tecnologías de
        ingeniería sostenible que permite a su comunidad de usuarios interactuar
        a través de publicaciones. El sitio web proporciona una plataforma
        gratuita para que expertos y estudiantes compartan sus conocimientos,
        experiencias y preguntas.
      </Box>
    </Flex>
  );
};
export default WebsiteInfo;
