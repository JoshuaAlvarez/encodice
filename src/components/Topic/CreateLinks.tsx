import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreatePostLink from "./CreatePostLink";

const CreateLinks: React.FC = () => {
  useEffect(() => {
    const getData = async () => {};
    getData();
  }, []);

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
        bgImage="url(/images/world.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('images/pagTema.png')"
      >
        Crea una publicación
      </Flex>
      <Flex>
        <CreatePostLink />
      </Flex>
    </Flex>
  );
};
export default CreateLinks;
