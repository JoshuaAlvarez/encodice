import {
  collection,
  getDocs,
  doc,
  writeBatch,
  increment,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import {
  Topic,
  TopicOverview,
  topicState,
} from "../atoms/topicsAtom";
import { auth, firestore } from "../firebase/clientApp";

const useTopicData = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [topicStateValue, setTopicStateValue] =
    useRecoilState(topicState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveTopic = (
    topicData: Topic,
    isJoined: boolean
  ) => {
    // is the user signed in?
    // if not => open auth modal
    if (!user) {
      // open modal
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setLoading(true);
    if (isJoined) {
      leaveTopic(topicData.id);
      return;
    }
    joinTopic(topicData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      // get users snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/topicSnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setTopicStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as TopicOverview[],
        snippetsFetched: true,
      }));

      console.log("here are snippets", snippets);
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const joinTopic = async (topicData: Topic) => {
    // batch write

    try {
      const batch = writeBatch(firestore);

      //creating a new topic snippet
      const newSnippet: TopicOverview = {
        topicId: topicData.id,
        imageURL: topicData.imageURL || "",
        isModerator: user?.uid === topicData.creatorId,
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/topicSnippets`,
          topicData.id
        ),
        newSnippet
      );

      // updating the numberOfMembers (1)
      batch.update(doc(firestore, "topics", topicData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      // update recoil state - topicState.mySnippets
      setTopicStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinTopic error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveTopic = async (topicId: string) => {
    // batch write
    try {
      const batch = writeBatch(firestore);

      // deleting the topic snippet from user
      batch.delete(
        doc(firestore, `users/${user?.uid}/topicSnippets`, topicId)
      );

      // updating the numberOfMembers (-1)
      batch.update(doc(firestore, "topics", topicId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      // update recoil state - topicState.mySnippets
      setTopicStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.topicId !== topicId
        ),
      }));
    } catch (error: any) {
      console.log("leaveTopic error", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  const getTopicData = async (topicId: string) => {
    try {
      const topicDocRef = doc(firestore, "topics", topicId);
      const topicDoc = await getDoc(topicDocRef);

      setTopicStateValue((prev) => ({
        ...prev,
        currentTopic: {
          id: topicDoc.id,
          ...topicDoc.data(),
        } as Topic,
      }));
    } catch (error) {
      console.log("getTopicData error", error);
    }
  };

  useEffect(() => {
    if (!user) {
      setTopicStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  useEffect(() => {
    const { topicId } = router.query;

    if (topicId && !topicStateValue.currentTopic) {
      getTopicData(topicId as string);
    }
  }, [router.query, topicStateValue.currentTopic]);

  return {
    // data and functions
    topicStateValue,
    onJoinOrLeaveTopic,
    loading,
  };
};
export default useTopicData;
