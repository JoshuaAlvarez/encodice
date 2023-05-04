import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  IconButton,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
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
    <Flex
      width={"600px"}
      flexGrow={1}
      maxWidth={"auto"}
      ml={14}
      alignItems="center"
    >
      <InputGroup onClick={handleButtonClick}>
        <InputLeftElement
          pointerEvents="none"
          color="gray.400"
          // children={<SearchIcon mb={2} />}
        >
          <SearchIcon mb={1} />
        </InputLeftElement>
        <Input
          placeholder="Buscar..."
          fontSize="11pt"
          _placeholder={{ color: "gray.400" }}
          _hover={{
            bg: "white",
            border: "2px solid",
            borderColor: "blue.600",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.600",
          }}
          height="35px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
