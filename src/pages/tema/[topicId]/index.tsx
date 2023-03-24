import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { Topic, topicState } from "../../../atoms/topicsAtom";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Topic/NotFound";
import Header from "../../../components/Topic/Header";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Topic/CreatePostLink";
import Posts from "../../../components/Posts/Posts";
import { Flex } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import About from "../../../components/Topic/About";

type TopicPageProps = {
  topicData: Topic;
};

const TopicPage: React.FC<TopicPageProps> = ({ topicData }) => {
  console.log("here is data", topicData);
  const setTopicStateValue = useSetRecoilState(topicState);

  useEffect(() => {
    if (topicData) {
      setTopicStateValue((prev) => ({
        ...prev,
        currentTopic: topicData,
      }));
    }
  }, [topicData, setTopicStateValue]);

  if (!topicData) {
    return <NotFound />;
  }

  return (
    <>
      <Header topicData={topicData} />
      <PageContent>
        <>
          <Flex>
            <CreatePostLink />
          </Flex>
          <Posts topicData={topicData} />
        </>
        <>
          <About topicData={topicData} />
        </>
      </PageContent>
    </>
  );
};

export default TopicPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get topic data and pass it to client
  try {
    const topicDocRef = doc(
      firestore,
      "topics",
      context.query.topicId as string
    );
    const topicDoc = await getDoc(topicDocRef);

    return {
      props: {
        topicData: topicDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: topicDoc.id, ...topicDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
}
