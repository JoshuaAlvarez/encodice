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
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";

const Suggestions: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunitySuggestions = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("getCommunirySuggestions error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunitySuggestions();
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
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
              return (
                <Link key={item.id} href={`/tema/${item.id}`}>
                  <Flex
                    align={"center"}
                    fontSize="10pt"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    p="10px 12px"
                  >
                    <Flex width="80%" align="center">
                      <Flex width="15%">
                        <Text>{index + 1}</Text>
                      </Flex>
                      <Flex align="center" width="80%">
                        {item.imageURL ? (
                          <Image
                            src={item.imageURL}
                            borderRadius="full"
                            boxSize="28px"
                            mr={2}
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
                          {`tema/${item.id}`}
                        </span>
                      </Flex>
                    </Flex>
                    <Box>
                      <Button
                        height="22px"
                        fontSize="8pt"
                        variant={isJoined ? "outline" : "solid"}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default Suggestions;
