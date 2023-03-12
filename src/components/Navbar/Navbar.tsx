import { Flex, Image } from "@chakra-ui/react";
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import Directory from './Directory/Directory';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
import useDirectory from "../../hooks/useDirectory";
import {
    defaultMenuItem,
    directoryMenuStateAtom,
} from "../../atoms/directoryMenuAtom";

const Navbar:React.FC = () => {

    const [user, loading, error] = useAuthState(auth);
    const { onSelectMenuItem } = useDirectory();

    return (
        <Flex
            bg='white'
            height='44px'
            padding='6px 12px'
            justify={{ md: "space-between" }}
        >
            <Flex
                align="center"
                width={{ base: "40px", md: "auto" }}
                mr={{ base: 0, md: 2}}
                onClick={() => onSelectMenuItem(defaultMenuItem)}
            >
                <Image src='/images/encodice-icon.svg' height='30px' alt=""/>
                <Image
                    src='/images/encodice-text.svg'
                    height='46px'
                    display={{ base: "none", md: "unset" }}
                    alt=""
                />
            </Flex>
            {user && <Directory />}
            <SearchInput user={user} />
            <RightContent user={user} />
        </Flex>
    );
};
export default Navbar;
