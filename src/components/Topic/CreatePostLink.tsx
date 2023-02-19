import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { auth } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";

type CreatePostLinkProps = {};

const CreatePostLink: React.FC<CreatePostLinkProps> = () => { // Rename to CreatePostButton
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const onClick = async () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { topicId } = router.query;

    if (!topicId) {
      toggleMenuOpen();
    } else {
      await router.push(`/tema/${topicId}/submit`).catch((error) => {
        console.error(error);
      });
      return;
    }
  };

  return (
    <Flex align="right" p={2} mb={4} >
        <Button mt={3} height="30px" onClick={onClick}>
          Crear una publicación
        </Button>
    </Flex>
  );
};
export default CreatePostLink;
