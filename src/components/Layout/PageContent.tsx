import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  // console.log("HERE IS CHILDREN", children);
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth="1100px">
        {/* LHS (ABOUT)*/}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
        {/* RHS (POSTS)*/}
        <Flex
          direction="column"
          width={{ base: "100%", md: "70%" }}
          ml={{ base: 0, md: 8 }}
          flexGrow={1}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
