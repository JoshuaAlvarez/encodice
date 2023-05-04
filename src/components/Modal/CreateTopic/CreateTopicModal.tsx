import {
  Box,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import useDirectory from "../../../hooks/useDirectory";

type CreateTopicModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState(""); // This is used to change the topic description
  const [charsRemaining, setCharsRemaining] = useState(30);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 30) return;

    setTopicName(event.target.value);
    // recalculate how many chars left
    setCharsRemaining(30 - event.target.value.length);
  };
  // Function "handleTopicDescription" to set the desciption of the topic
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTopicDescription(event.target.value);
  };

  const handleCreateTopic = async () => {
    if (error) setError("");
    // Validate the topic
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(topicName) || topicName.length < 3) {
      setError(
        "Los nombres de los temas deben ser de 3 a 30 caracteres y solo pueden contener letras, números y guiones bajos."
      );
      return;
    }

    setLoading(true);

    try {
      // Create the topic document in firestore
      // Check that name is not taken
      // If valid name then create topic

      const topicDocRef = doc(firestore, "topics", topicName);

      await runTransaction(firestore, async (transaction) => {
        // Check if topic exists in db
        const topicDoc = await transaction.get(topicDocRef);
        if (topicDoc.exists()) {
          throw new Error(
            `El nombre ${topicName} no está disponible. Intenta con otro.`
          );
        }

        // Create topic
        transaction.set(topicDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          description: topicDescription, // The value entered in the input by the user should then be set in the document
        });

        // Create topicSnippets on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/topicSnippets`, topicName),
          {
            topicId: topicName,
            isModerator: true,
          }
        );
      });

      handleClose();
      toggleMenuOpen();
      await router.push(`tema/${topicName}`);
    } catch (error: any) {
      console.log("handleCreateTopic error", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Crea un tema
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Nombre
              </Text>

              <Input
                position="relative"
                value={topicName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />

              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Caracteres restantes
              </Text>

              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
            </ModalBody>
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Descripción
              </Text>

              {/* Call for a onChange={} to set the topic desciption */}
              <Input
                position="relative"
                size="sm"
                pl="22px"
                value={topicDescription}
                onChange={handleChangeDescription}
              />

              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              height="30px"
              onClick={handleCreateTopic}
              isLoading={loading}
            >
              Crear tema
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateTopicModal;
