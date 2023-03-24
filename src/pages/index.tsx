import { Stack } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post, PostVote } from "../atoms/postsAtom";
import CreatePostLink from "../components/Topic/CreatePostLink";
import WebsiteInfo from "../components/Topic/WebsiteInfo";
import Suggestions from "../components/Topic/Suggestions";
import PageContent from "../components/Layout/PageContent";
import PostItem from "../components/Posts/PostItem";
import PostLoader from "../components/Posts/PostLoader";
import { auth, firestore } from "../firebase/clientApp";
import useTopicData from "../hooks/useTopicData";
import usePosts from "../hooks/usePosts";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();
  const { topicStateValue } = useTopicData();

  const createUserMainFeed = async () => {
    // traer posts de temas del usuario
    setLoading(true);
    try {
      if (topicStateValue.mySnippets.length) {
        const myTopicIds = topicStateValue.mySnippets.map(
          (snippet) => snippet.topicId
        );
        const postQuery = query(
          collection(firestore, "posts"),
          where("topicId", "in", myTopicIds),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        await createGuestMainFeed();
      }
    } catch (error) {
      console.log("createUserMainFeed error", error);
    }
    setLoading(false);
  };

  const createGuestMainFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
      // setPostState
    } catch (error) {
      console.log("createGuestMainFeed error", error);
    }
    setLoading(false);
  };

  const fetchUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );
      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error) {
      console.log("fetchUserPostVotes error", error);
    }
  };

  // useEffects
  useEffect(() => {
    if (!user && !loadingUser) createGuestMainFeed();
  }, [user, loadingUser]);

  useEffect(() => {
    if (topicStateValue.snippetsFetched) createUserMainFeed();
  }, [topicStateValue.mySnippets]);

  useEffect(() => {
    if (user && postStateValue.posts.length) fetchUserPostVotes();

    // Clean up function
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postStateValue.posts]);

  return (
    <PageContent>
      <>
        {topicStateValue.currentTopic && <CreatePostLink />}
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                onVote={onVote}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={5}>
        <WebsiteInfo />
        <Suggestions />
      </Stack>
    </PageContent>
  );
};

export default Home;
