import { Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
        {loading  ? (
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
          
        )

        }
      </Flex>
    </Flex>
  );
};
export default Suggestions;
