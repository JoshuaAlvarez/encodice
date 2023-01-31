import {IconType} from "react-icons";
import {GiBookshelf} from "react-icons/gi";
import {atom} from "recoil";

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
    displayText: 'Lista de Temas',
    link: '/',
    icon: GiBookshelf,
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
