import React from "react";
import { Box, Text } from "@chakra-ui/react";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import useTopicData from "../../../hooks/useTopicData";
import About from "../../../components/Topic/About";
const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { topicStateValue } = useTopicData();
  console.log("Topic", topicStateValue);

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Crea una publicación</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            topicImageURL={topicStateValue.currentTopic?.imageURL}
          />
        )}
      </>
      <>
        {topicStateValue.currentTopic && (
          <About topicData={topicStateValue.currentTopic} />
        )}
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
