import { Box, Flex, Icon, Image, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import { FaLandmark } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";
import useCommunityData from "../../hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue} =
    useCommunityData();
  !!communityStateValue.mySnippets.find(
      (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="100px">
      <Box height="5%" bg="white" /> {/* Later give Navbar shadow bot */}
      <Flex justify="center" bg="#192f60" flexGrow={1}>
        <Flex width="95%" maxWidth="1100px">
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              borderRadius="5px"
              boxSize="80px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Topic Image"
              position="relative"
              top={3}
              color="red.500"
              border="1px solid white"
            />
          ) : (
            <Icon
              borderRadius="5%"
              as={FaLandmark}
              fontSize={70}
              position="relative"
              top={3}
              color="white"
              border="3px solid white"
            />
          )}
          <Flex padding="12px 18px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={850} fontSize="23pt" color={"white"}>
                {communityData.id}
              </Text>
              {/*<Text fontWeight={600} fontSize="10pt" color="gray.400">
                {communityData.id}
              </Text>*/}
            </Flex>
            {/*<Button
              variant={isJoined ? "outline" : "solid"}
              height="33px"
              pr={6}
              pl={6}
              isLoading={loading}
              rightIcon={<MdOutlineDoorbell />}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Suscrito" : "Suscríbete a este tema"}
            </Button>*/}
            <Spacer />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
