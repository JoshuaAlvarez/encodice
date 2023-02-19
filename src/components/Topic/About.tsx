import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaLandmark } from "react-icons/fa";
import { Topic, topicState } from "../../atoms/topicsAtom";
import { auth, firestore, storage } from "../../firebase/clientApp";
import useSelectFile from "../../hooks/useSelectFile";
import { useSetRecoilState } from "recoil";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import useTopicData from "../../hooks/useTopicData";
import CreatePostLink from "./CreatePostLink";

type AboutProps = {
  topicData: Topic;
};

const About: React.FC<AboutProps> = ({ topicData }) => {
  const { topicStateValue, onJoinOrLeaveTopic, loading } =
      useTopicData();
  const isJoined = !!topicStateValue.mySnippets.find(
      (item) => item.topicId === topicData.id
  );
  const router = useRouter(), [user] = useAuthState(auth), selectedFileRef = useRef<HTMLInputElement>(null), {
        selectedFile,
        onSelectFile
      } = useSelectFile(), [uploadingImage, setUploadingImage] = useState(false),
      setTopicStateValue = useSetRecoilState(topicState), onUpdateImage = async () => {
        if (!selectedFile) return;
        setUploadingImage(true);
        try {
          const imageRef = ref(storage, `topics/${topicData.id}/image`);
          await uploadString(imageRef, selectedFile, "data_url");
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(firestore, "topics", topicData.id), {
            imageURL: downloadURL,
          });

          setTopicStateValue((prev) => ({
            ...prev,
            currentTopic: {
              ...prev.currentTopic,
              imageURL: downloadURL,
            } as Topic,
          }));
        } catch (error) {
          console.log("onUpdateImage error", error);
        }
        setUploadingImage(false);
      };

  return (
      <Box position={"sticky"} top="12px">
        <Flex
            justify={"space-between"}
            align="center"
            bg="#192f60"
            color="white"
            p={3}
            borderRadius="4px 4px 0px 0px"
        >
          <Text fontSize={"11pt"} fontWeight={700}>
            Información del Tema
          </Text>
        </Flex>
        <Flex
            direction={"column"}
            p={3}
            bg="white"
            borderRadius={"1px 1px 2px 2px"}
        >

          <Button
              variant={isJoined ? "outline" : "solid"}
              height="33px"
              isLoading={loading}
              onClick={() => onJoinOrLeaveTopic(topicData, isJoined)}
              width="fit-content"
          >
            {isJoined ? "Suscrito" : "Suscríbete a este Tema"}
          </Button>
          <Stack>
            <Flex width={"100%"} p={2} fontSize="10pt" fontWeight={700}>
              <Flex direction={"column"} flexGrow={1} mt={2}>
                <Text>Miembros: </Text>
                <Text>{topicData.numberOfMembers.toLocaleString()}</Text>
              </Flex>
            </Flex>
            <Divider />
            <Flex width="100%" p={1} direction="column">
              <Flex align={"center"} fontWeight={500} fontSize="10pt">
                {topicData.createdAt && (
                    <Text>
                      Creado el{" "}
                      {moment(
                          new Date(topicData.createdAt.seconds * 1000)
                      ).format("DD / MM / YYYY")}
                    </Text>
                )}
              </Flex>
              <CreatePostLink />
            </Flex>
            {user?.uid === topicData.creatorId && (
                <>
                  <Divider />
                  <Stack spacing={1} fontSize="10pt">
                    <Text fontWeight={600}>Administrar</Text>
                    <Flex align={"center"} justify="space-between">
                      <Text
                          color="blue.500"
                          cursor={"pointer"}
                          _hover={{ textDecoration: "underline" }}
                          onClick={() => selectedFileRef.current?.click()}
                      >
                        Cambiar imagen
                      </Text>
                      {topicData.imageURL || selectedFile ? (
                          <Image
                              src={selectedFile || topicData.imageURL}
                              borderRadius="full"
                              boxSize={"40px"}
                              alt="Imagen del Tema"
                          />
                      ) : (
                          <Icon
                              as={FaLandmark}
                              fontSize={40}
                              color="brand.100"
                              mr={2}
                          />
                      )}
                    </Flex>
                    {selectedFile &&
                        (uploadingImage ? (
                            <Spinner />
                        ) : (
                            <Text cursor={"pointer"} onClick={onUpdateImage}>
                              Guardar cambios
                            </Text>
                        ))}
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        hidden
                        ref={selectedFileRef}
                        onChange={onSelectFile}
                    />
                  </Stack>
                </>
            )}
          </Stack>
        </Flex>
      </Box>
  );
};
export default About;
