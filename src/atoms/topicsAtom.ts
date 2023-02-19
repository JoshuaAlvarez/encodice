// Defines types and a state for a topic system
import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Topic {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    createdAt?: Timestamp; // Useful to ensure a timestamp is always available for when the topic was created
    imageURL?: string;
    description?: string;   // Implement in functions
}

export interface TopicOverview {
    topicId: string;
    isModerator?: boolean;
    imageURL?: string;
}

interface TopicState {
    mySnippets: TopicOverview[];
    currentTopic?: Topic;
    snippetsFetched: boolean;
}

const defaultTopicState: TopicState = {
    mySnippets: [],
    snippetsFetched: false,
};

export const topicState = atom<TopicState>({
    key: "topicStateData",
    default: defaultTopicState,
});
