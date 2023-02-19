import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  // Close the modal if valid user
  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
      <>
        <Modal isOpen={modalState.open} onClose={handleClose} >
          <ModalOverlay />
          <ModalContent bg="#F8F9F9">
            <ModalHeader textAlign={"center"}>
              {modalState.view === "login" && "Iniciar sesión"}
              {modalState.view === "signup" && "Registro"}
              {modalState.view === "resetPassword" && "Reset Password"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
                display={"flex"}
                flexDirection="column"
                alignItems={"center"}
                justifyContent="center"
                pb={6}
            >
              {loading && (
                  <Flex justify={"center"} width="100%" height="100%">
                    <Spinner />
                  </Flex>
              )}
              {error && (
                  <Text color="red.500" fontWeight={700}>
                    {error.message}
                  </Text>
              )}
              {!loading && !error && (
                  <Flex
                      direction={"column"}
                      align="center"
                      justify={"center"}
                      width="70%"
                  >
                    {modalState.view === "login" || modalState.view === "signup" ? (
                        <>
                          <OAuthButtons />
                          <Text color="gray.500" fontWeight={700}>
                            O
                          </Text>
                          <AuthInputs />
                        </>
                    ) : (
                        <ResetPassword />
                    )}
                  </Flex>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
};
export default AuthModal;
