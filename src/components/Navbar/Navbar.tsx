import { Flex, Image, Button, Box } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
// import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
// import ProjectsButton from "./ProjectsButton";
import LearningButton from "./LearningButton";
import useDirectory from "../../hooks/useDirectory";
import {
  defaultMenuItem,
  directoryMenuStateAtom,
} from "../../atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Box boxShadow="md" borderTop="5px solid #192f60">
      <Flex
        bg="white"
        height="46px"
        padding="6px 12px"
        justify={{ md: "space-between" }}
        mt={1}
      >
        <Flex
          align="center"
          width={{ base: "40px", md: "auto" }}
          mr={{ base: 0, md: 2 }}
          ml={{ base: 0, md: 3 }}
          onClick={() => onSelectMenuItem(defaultMenuItem)}
        >
          <Image src="/images/encodice-icon.svg" height="40px" alt="" />
          <Image
            src="/images/encodice-text.svg"
            height="56px"
            display={{ base: "none", md: "unset" }}
            alt=""
          />
        </Flex>
        <Flex align="center" justify={{ md: "space-between" }}>
          <SearchInput />
          {/* <ProjectsButton />
          <LearningButton /> */}
        </Flex>
        {/* {user && <Directory />} */}
        <RightContent user={user} />
      </Flex>
    </Box>
  );
};
export default Navbar;
