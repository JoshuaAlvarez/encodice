import { useFocusEffect } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaLandmark } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { topicState } from "../atoms/topicsAtom";
import {
  DirectoryMenuItem,
  directoryMenuStateAtom,
} from "../atoms/directoryMenuAtom";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuStateAtom);
  const router = useRouter();
  const topicStateValue = useRecoilValue(topicState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const { currentTopic } = topicStateValue;

    if (currentTopic) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `tema/${currentTopic.id}`,
          link: `/tema/${currentTopic.id}`,
          imageURL: currentTopic.imageURL,
          icon: FaLandmark,
          iconColor: "blue.500",
        },
      }));
    }
  }, [topicStateValue.currentTopic]);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
