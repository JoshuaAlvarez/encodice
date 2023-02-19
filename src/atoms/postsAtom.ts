// Defines types and a state for a user-generated post system with voting and creates a Recoil atom with default state
import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
    id?: string;
    topicId: string;
    creatorId: string;
    creatorDisplayName: string;
    title: string;
    body: string;
    numberOfComments: number;
    voteStatus: number;
    imageURL?: string;
    topicImageURL?: string;
    createdAt: Timestamp;
};

export type PostVote = {
    id: string;
    postId: string;
    topicId: string;
    voteValue: number;
}

interface PostState {
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
    postVotes: [],
};

export const postState = atom<PostState>({
    key: "postState",
    default: defaultPostState,
});
