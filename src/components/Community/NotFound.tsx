import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const CommunityNotFound: React.FC = () => {
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            Este tema no existe o ha sido eliminado.
            <Link href="/">
                <Button mt={4}>REGRESAR</Button>
            </Link>
        </Flex>
    )
}
export default CommunityNotFound;