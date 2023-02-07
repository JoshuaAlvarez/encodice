// State atom for controlling the authentication modal
import { atom } from "recoil";

export interface AuthModalState {
    // Flag indicating if the modal is open or closed
    open: boolean;
    // Current view within the modal
    view: "login" | "signup" | "resetPassword";
}

const defaultModalState: AuthModalState = {
    open: false,
    view: "login",
};

export const authModalState = atom<AuthModalState>({
    key: "authModalState",
    default: defaultModalState,
});
