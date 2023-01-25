import { Box, Button, Flex, Icon, Image, Text, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaLandmark } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";
import useCommunityData from "../../hooks/useCommunityData";
import { useSetRecoilState } from "recoil";
import { MdOutlineDoorbell, MdDoorbell } from "react-icons/md";
import Link from "next/link";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  ); // read from our communitySnippets

  return (
    <Flex direction="column" width="100%"  height="100px">
      <Box height="5%" bg="brand.100" />
      <Flex justify="center" bg="#f4f4f4" flexGrow={1}>
        <Flex width="95%" maxWidth="1100px" >
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              borderRadius="5px"
              boxSize="80px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Community Image"
              position="relative"
              top={-3}
              color="red.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaLandmark}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="full"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                tema/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="33px"
              pr={6}
              pl={6}
              isLoading={loading}
              rightIcon={<MdOutlineDoorbell />}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Suscrito" : "Suscríbete a este tema"}
            </Button>
            <Spacer />
            <Flex>
              <Link href={`/tema/${communityData.id}/submit`}>
                <Button
                    mt={3}
                    height="33px"
                    pr={6}
                    pl={6}
                >
                  Crear una publicación
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
