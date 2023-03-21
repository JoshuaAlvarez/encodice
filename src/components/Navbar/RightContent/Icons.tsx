import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FiBell } from "react-icons/fi";

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
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            {/* <Icon as={FiBell} fontSize={20} /> */}
            {/* Show notif */}
          </Flex>
        </>
      </Flex>
    </Flex>
  );
};
export default Icons;
