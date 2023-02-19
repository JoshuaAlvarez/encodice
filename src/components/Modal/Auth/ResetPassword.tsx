import React, { useState } from "react";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot, BsJournalText } from "react-icons/bs";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";

const ResetPassword: React.FC =
  (/* { toggleView } */) => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [sendPasswordResetEmail, sending, error] =
      useSendPasswordResetEmail(auth);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await sendPasswordResetEmail(email);
      setSuccess(true);
    };
    return (
      <Flex direction="column" alignItems="center" width="100%">
        <Icon as={BsJournalText} color="brand.100" fontSize={40} mb={2} />
        <Text fontWeight={700} mb={2}>
          Restablece tu contraseña
        </Text>
        {success ? (
          <Text mb={4}>Revisa tu correo electrónico</Text>
        ) : (
          <>
            <Text fontSize="sm" textAlign="center" mb={2}>
              Ingresa el correo electrónico asociado con tu cuenta y te
              llegará un enlace de restablecimiento
            </Text>
            <form onSubmit={onSubmit} style={{ width: "100%" }}>
              <Input
                required
                name="email"
                placeholder="email"
                type="email"
                mb={2}
                onChange={(event) => setEmail(event.target.value)}
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
              />
              <Text textAlign="center" fontSize="10pt" color="red">
                {error?.message}
              </Text>
              <Button
                width="100%"
                height="36px"
                mb={2}
                mt={2}
                type="submit"
                isLoading={sending}
              >
                Restablecer la contraseña
              </Button>
            </form>
          </>
        )}
        <Flex
          alignItems="center"
          fontSize="9pt"
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          <Text
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }))
            }
          >
            Inicia sesión
          </Text>
          <Icon as={BsDot} />
          <Text
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "signup",
              }))
            }
          >
            Regístrate
          </Text>
        </Flex>
      </Flex>
    );
  };
export default ResetPassword;
