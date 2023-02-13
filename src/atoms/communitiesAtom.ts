import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    // privacyType: "public" | "restricted" | "private";
    createdAt?: Timestamp; //Useful to ensure a timestamp is always available for when the community was created
    imageURL?: string;
    description?: string;   // Implement in functions ¡¡
}

export interface CommunityOverview {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string;
}

interface CommunityState {
    mySnippets: CommunityOverview[];
    currentCommunity?: Community;
    snippetsFetched: boolean;
}

const defaultCommunityState: CommunityState = {
    mySnippets: [],
    snippetsFetched: false,
};

export const communityState = atom<CommunityState>({
    key: "communitiesStateData",
    default: defaultCommunityState,
});
