import {
  Flex,
  Icon,
  Link,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaLandmark } from "react-icons/fa";
import { Topic } from "../../atoms/topicsAtom";
import { firestore } from "../../firebase/clientApp";
import useTopicData from "../../hooks/useTopicData";

const Suggestions: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const { topicStateValue, onJoinOrLeaveTopic } = useTopicData();

  const getTopicSuggestions = async () => {
    setLoading(true);
    try {
      const topicQuery = query(
          collection(firestore, "topics"),
          orderBy("numberOfMembers", "desc"),
          limit(5)
      );
      const topicDocs = await getDocs(topicQuery);
      const topics = topicDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(topics as Topic[]);
    } catch (error) {
      console.error("getTopicSuggestions error", error);
      setTopics([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      await getTopicSuggestions();
    };
    getData();
  }, []);

  return (
      <Flex
          direction={"column"}
          bg="white"
          borderRadius={4}
          border="1px solid"
          borderColor={"gray.300"}
      >
        <Flex
            align={"flex-end"}
            color="white"
            p="6px 10px"
            height={"70px"}
            borderRadius="4px 4px 0px 0px"
            fontWeight={700}
            bgImage="url(/images/pagTema.png)"
            backgroundSize="cover"
            bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('images/pagTema.png')"
        >
          Temas principales
        </Flex>
        <Flex direction={"column"}>
          {loading ? (
              <Stack mt={2} p={3}>
                <Flex justify={"space-between"} align="center">
                  <SkeletonCircle size="10" />
                  <Skeleton height={"10px"} width="70%" />
                </Flex>
                <Flex justify={"space-between"} align="center">
                  <SkeletonCircle size={"10"} />
                  <Skeleton height={"10px"} width="70%" />
                </Flex>
                <Flex justify={"space-between"} align="center">
                  <SkeletonCircle size={"10"} />
                  <Skeleton height={"10px"} width="70%" />
                </Flex>
              </Stack>
          ) : (
              <>
                {topics.map((item, index) => {
                  const isJoined = !!topicStateValue.mySnippets.find(
                      (snippet) => snippet.topicId === item.id
                  );
                  return (
                      <Link key={item.id} href={`/tema/${item.id}`}>
                        <Flex
                            position={"relative"}
                            align={"center"}
                            fontSize="10pt"
                            borderBottom="1px solid"
                            borderColor="gray.200"
                            p="10px 12px"
                        >
                          <Flex width="80%" align="center">
                            <Flex width="15%">
                              <Text>{index + 1}°</Text>
                            </Flex>
                            <Flex align="center" width="80%">
                              {item.imageURL ? (
                                  <Image
                                      src={item.imageURL}
                                      borderRadius="full"
                                      boxSize="28px"
                                      mr={2}
                                      alt="topic-image"
                                  />
                              ) : (
                                  <Icon
                                      as={FaLandmark}
                                      fontSize={30}
                                      color="brand.100"
                                      mr={2}
                                  />
                              )}
                              <span
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                              >
                          {`${item.id}`}
                        </span>
                            </Flex>
                          </Flex>
                          <Box position="absolute" right="10px">
                            <Button
                                height="22px"
                                fontSize="8pt"
                                variant={isJoined ? "outline" : "solid"}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  onJoinOrLeaveTopic(item, isJoined);
                                }}
                            >
                              {isJoined ? "Suscrito" : "Suscríbete"}
                            </Button>
                          </Box>
                        </Flex>
                      </Link>
                  );
                })}
                <Box p="10px 20px">
                  <Button height="30px" width="100%">
                    View All
                  </Button>
                </Box>
              </>
          )}
        </Flex>
      </Flex>
  );
};
export default Suggestions;
