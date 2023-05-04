import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FiBell } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GoGraph } from "react-icons/go";

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor={"gray.200"}
      >
        <>
          <Flex
            mr={3.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            {/* <Icon as={FiBell} fontSize={20} /> */}
            {/* Show notif */}
            <Icon as={GoGraph} fontSize={28} mr={1.5} />
            <Icon as={AiOutlineQuestionCircle} fontSize={30} />
          </Flex>
        </>
      </Flex>
    </Flex>
  );
};
export default Icons;
