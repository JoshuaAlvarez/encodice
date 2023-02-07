import { Button, Flex, Icon, Input, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaLandmark } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { Community } from "../../atoms/communitiesAtom";
import { auth } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";

type CreatePostLinkProps = {
  communityData: Community;
};

const CreatePostLink: React.FC<CreatePostLinkProps> = ({ communityData }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const onClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;

    if (communityId) {
      router.push(`/tema/${communityId}/submit`);
      return;
    }

    // Open the directory menu
    toggleMenuOpen();
  };

  return (
    <Flex align="right" p={2} mb={4}>
      <Link href={`/tema/${communityData.id}/submit`}>
        <Button mt={3} height="30px">
          Crear una publicación
        </Button>
      </Link>
      {/* <Icon as={FaLandmark} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Crear una publicación"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" /> */}
    </Flex>
  );
};
export default CreatePostLink;
