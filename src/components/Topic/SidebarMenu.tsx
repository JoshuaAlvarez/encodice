import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import CreatePostLink from "./CreatePostLink";
import Directory from "../Navbar/Directory/Directory";
import { user } from "firebase-functions/v1/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { BsGraphUp } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import { FaQuestionCircle, FaUserGraduate } from "react-icons/fa";

export default function SidebarMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      boxShadow="ml"
    >
      <Flex
        direction={"column"}
        bg="white"
        borderRadius={4}
        border="1px solid"
        borderColor={"gray.300"}
        mb={3}
      >
        <Flex
          fontSize={20}
          align={"flex-end"}
          color="white"
          p="6px 10px"
          height={"70px"}
          borderRadius="0px 0px 0px 0px"
          fontWeight={700}
          bgImage="url(/images/pagTema.png)"
          backgroundSize="cover"
          bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('images/pexels-démerson-reis-8137732.jpg')"
        >
          encodice
        </Flex>
      </Flex>
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      {user && <Directory />}
      <NavItem icon={FiHome} url={"/"}>
        Inicio
      </NavItem>
      <NavItem icon={BsGraphUp} url={"/temasprincipales"}>
        Temas principales
      </NavItem>
      <NavItem icon={SiBookstack} url={"/proyectos"}>
        Proyectos
      </NavItem>
      <NavItem icon={FaUserGraduate} url={"/aprende"}>
        Aprendizaje
      </NavItem>
      <NavItem icon={FaQuestionCircle} url={"/about"}>
        Acerca de
      </NavItem>
      <Flex ml={7} mt={2}>
        <CreatePostLink />
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  url: string;
}

const NavItem = ({ icon, children, url, ...rest }: NavItemProps) => {
  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ ...rest }: MobileProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export { SidebarMenu };
