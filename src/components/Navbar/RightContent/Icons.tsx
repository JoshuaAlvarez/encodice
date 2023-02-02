import { Flex, Icon } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FiBell } from "react-icons/fi";

const Icons: React.FC = () => {
  const [user, loadingUser] = useAuthState(auth);

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
            <Icon as={FiBell} fontSize={20} />
            {/* Show notif */}
          </Flex>
          {/* <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={FiBell} fontSize={20} />
           Show create new 
        </Flex> 
        <Flex
          mr={3}
          ml={1.5}
          padding={1}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
          display={{ base: "none", md: "flex" }}
          */}
        </>
      </Flex>
    </Flex>
  );
};
export default Icons;
