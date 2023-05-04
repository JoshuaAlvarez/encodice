import { Box, Flex, Icon, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FaLandmark } from "react-icons/fa";
import { Topic } from "../../atoms/topicsAtom";
import useTopicData from "../../hooks/useTopicData";
// import CreatePostLink from "./CreatePostLink";

type HeaderProps = {
  topicData: Topic;
};

const Header: React.FC<HeaderProps> = ({ topicData }) => {
  const { topicStateValue, onJoinOrLeaveTopic, loading } = useTopicData();
  const isJoined = !!topicStateValue.mySnippets.find(
    (item) => item.topicId === topicData.id
  );

  !!topicStateValue.mySnippets.find((item) => item.topicId === topicData.id);

  return (
    <Flex direction="column" width="100%" height="100px">
      <Box height="5%" bg="white" />
      <Flex justify="center" bg="#192f60" flexGrow={1}>
        <Flex width="95%" maxWidth="1100px">
          {topicStateValue.currentTopic?.imageURL ? (
            <Image
              borderRadius="5px"
              boxSize="80px"
              src={topicStateValue.currentTopic.imageURL}
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
                {topicData.id}
              </Text>
            </Flex>
            <Spacer />
            {/* If user is Mobile */}
            {/* <Flex>
              <CreatePostLink />
              <Button
                mt={5}
                variant={isJoined ? "outline" : "solid"}
                height="33px"
                isLoading={loading}
                onClick={() => onJoinOrLeaveTopic(topicData, isJoined)}
                width="fit-content"
              >
                {isJoined ? "Suscrito" : "Suscríbete a este Tema"}
              </Button>
            </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
