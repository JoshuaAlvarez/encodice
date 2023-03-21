import React from "react";
//import { ICON } from "@chakra-ui/icons";
import { Flex, Button, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/router";

type LearningButtonProps = {
  user?: User | null;
};

const LearningButton: React.FC<LearningButtonProps> = ({ user }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/aprende");
  };

  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "100px"} mr={2} align="center">
      <Button
        onClick={handleButtonClick}
        //        leftIcon={<ICON color="gray.400" />}
        fontSize="10pt"
        height="34px"
        bg="gray.50"
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      >
        Aprende
      </Button>
    </Flex>
  );
};

export default LearningButton;
