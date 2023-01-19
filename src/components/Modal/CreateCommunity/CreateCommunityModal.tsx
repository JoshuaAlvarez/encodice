import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider, Text, Input, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from '../../../firebase/clientApp';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
    open,
    handleClose
}) => {
    const [user] = useAuthState(auth);
    const [communityName, setCommunityName] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;

        setCommunityName(event.target.value);
        // recalculate how many chars left
        setCharsRemaining(21 - event.target.value.length);
    };

    const onCommunityTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCommunityType(event.target.name);
    };

    const handleCreateCommunity = async () => {
        if (error) setError("");
        // Validate the community
        const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (format.test(communityName) || communityName.length < 3) {
            setError(
                "Los nombres de los temas deben ser de 3 a 21 caracteres y solo pueden contener letras, números y guiones bajos."
            );
            return;
        }

        setLoading(true);

        try {
            // Create the community document in firestore
            // Check that name is not taken
            // If valid name, create community

            const communityDocRef = doc(firestore, "communities", communityName);

            await runTransaction(firestore, async (transaction) =>{
                // Check if community exists in db
            const communityDoc = await transaction.get(communityDocRef);
            if (communityDoc.exists()) {
                throw new Error(`El nombre r/${communityName} no está disponible. Intenta con otro.`);
            }

            // Create community
            transaction.set(communityDocRef, {
                creatorId: user?.uid,
                createdAt: serverTimestamp(),
                numberOfMembers: 1,
                privacyType: communityType,
            });

            // Create communitySnippet on user
            transaction.set(
                doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
                {
                    communityId: communityName,
                    isModerator: true,
                }
            );
            });

            
        } catch (error: any) {
            console.log('handleCreateCommunity error', error);
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
                        padding={3} /*Renombrar "comunidad" a "tema" */
                    >
                        Crea una comunidad
                    </ModalHeader>
                    <Box pl={3} pr={3}>
                        <Divider />
                        <ModalCloseButton />
                        <ModalBody display="flex" flexDirection="column" padding="10px 0px">
                            <Text fontWeight={600} fontSize={15}>
                                Nombre
                            </Text>
                            <Text fontSize={11} color="gray.500">
                                Community names including capitalization cannot be changed
                            </Text>
                            <Text
                                position="relative"
                                top="28px"
                                left="10px"
                                width="20px"
                                color="gray.400"
                            >
                                r/
                            </Text>
                            <Input
                                position="relative"
                                value={communityName}
                                size="sm"
                                pl="22px"
                                onChange={handleChange}
                            />
                            <Text fontSize="9pt" color={charsRemaining === 0 ? "red" : "gray.500"}>
                                {charsRemaining} Caracteres restantes
                            </Text>
                            <Text fontSize="9pt" color="red" pt={1}>
                                {error}
                            </Text>
                            <Box mt={4} mb={4}>
                                <Text fontWeight={600} fontSize={15}>
                                    Tipo de comunidad
                                </Text>
                                {/* checkbox */}
                                <Stack spacing={2}>
                                    <Checkbox
                                        name='public'
                                        isChecked={communityType === 'public'}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align={"center"}>
                                            <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Pública
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500" pt={1}>
                                                Cualquiera puede ver, publicar y comentar en esta comunidad.
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name='restricted'
                                        isChecked={communityType === 'restricted'}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align={"center"}>
                                            <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Restringida
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500" pt={1}>
                                                Cualquiera puede ver esta comunidad pero solo usuarios aprobados pueden publicar.
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name='private'
                                        isChecked={communityType === 'private'}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align={"center"}>
                                            <Icon as={HiLockClosed} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Privada
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500" pt={1}>
                                                Solo usuarios aprobados pueden ver y publicar en esta comunidad.
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
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
                            onClick={handleCreateCommunity}
                            isLoading={loading}
                        >
                            Crear comunidad
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default CreateCommunityModal;