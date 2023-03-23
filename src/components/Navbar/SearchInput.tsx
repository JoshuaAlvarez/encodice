import { SearchIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("./search");
  };

  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "100px"} mr={2} align="center">
      <Button
        onClick={handleButtonClick}
        leftIcon={<SearchIcon color="gray.400" />}
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
        Buscar
      </Button>
    </Flex>
  );
};

export default SearchInput;
