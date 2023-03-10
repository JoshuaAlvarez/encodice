import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateTopicModal from "../../Modal/CreateTopic/CreateTopicModal";
import { CgAddR } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import { topicState } from "../../../atoms/topicsAtom";
import MenuListItem from "./MenuListItem";
import { FaLandmark } from "react-icons/fa";

type TopicsProps = {};

const Topics: React.FC<TopicsProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(topicState).mySnippets;

  return (
    <>
      <CreateTopicModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          Temas creados
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.topicId}
              icon={FaLandmark}
              displayText={`tema/${snippet.topicId}`}
              link={`/tema/${snippet.topicId}`}
              iconColor="brand.500"
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          Temas
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={CgAddR} />
            Crear Tema
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.topicId}
            icon={FaLandmark}
            displayText={`tema/${snippet.topicId}`}
            link={`/tema/${snippet.topicId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};
export default Topics;
