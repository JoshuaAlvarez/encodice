import { IconType } from "react-icons";
import {TiWorldOutline} from "react-icons/ti";
import { atom } from "recoil";

export type DirectoryMenuItem = {
    displayText: string;
    link: string;
    icon: IconType;
    iconColor: string;
    imageURL?: string;
};

interface DirectoryMenuState {
    isOpen: boolean;
    selectedMenuItem: DirectoryMenuItem;
}

export const defaultMenuItem: DirectoryMenuItem = {
    displayText: 'Main',
    link: '/',
    icon: TiWorldOutline,
    iconColor: 'gray.900',
};

export const defaultMenuState: DirectoryMenuState = {
    isOpen: false,
    selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom<DirectoryMenuState>({
    key: "directoryMenuState",
    default: defaultMenuState,
});
