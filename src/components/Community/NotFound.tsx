import React from "react";
import { Flex, Button, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface CommunityNotFoundProps {}

const CommunityNotFound: React.FC<CommunityNotFoundProps> = () => {
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            <Image
                src="/images/—Pngtree—404 error page not found_resized.png"
                maxW="40%"
                maxH="40%"
                alt="404 error: Page not found"
                mt={4}
            />
            <Text mt={4} textAlign="center">
                Este tema no existe o ha sido eliminado.
            </Text>
            <Link href="/">
                <Button mt={4}>Regresar</Button>
            </Link>
        </Flex>
    );
};

export default CommunityNotFound;
