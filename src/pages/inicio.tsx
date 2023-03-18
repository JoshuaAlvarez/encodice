import { Box, Button, Heading, ChakraProvider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

function MyComponent() {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push("/");
    };

    return (
        <Box
            backgroundImage="url('/images/pexels-hasan-albari-1229861.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
            h="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            textAlign="center"
        >
            <Text fontSize="50px" color="white" fontWeight="bold" textShadow="5px 5px 5px rgba(128, 128, 128, 0.5)">
                ¡Bienvenido a Encodice!
            </Text>
            <Box w="60%">
                <Text style={{ fontSize: "24px", color: "white" }}>
                    Encodice es un sitio web en el que encontrarás grupos de temas relacionados a la ingeniería y
                    una comunidad de usuarios para compartir publicaciones y comentarios.
                </Text>
            </Box>
            <Box display="flex" justifyContent="center">
                <Box
                    textAlign="center"
                    mr="4"
                    borderRadius="md"
                    bg="white"
                    p="4"
                    w="60%"
                    boxShadow="0 0 10px rgba(0, 0, 0, 0.25)"
                >
                    <Text style={{ fontSize: "19px", color: "blue.500" }}>
                        Haz preguntas, publicaciones y encuentra respuestas
                    </Text>
                    <Button colorScheme="blue" onClick={handleButtonClick}>Feed principal</Button>
                </Box>
                <Box
                    textAlign="center"
                    mr="4"
                    borderRadius="md"
                    bg="white"
                    p="4"
                    w="60%"
                    boxShadow="0 4px 6px rgba(255, 255, 255, 0.3)"
                >
                    <Text style={{ fontSize: "19px", color: "blue.500" }}>
                        Revisa la base de proyectos multidisciplinarios.
                    </Text>
                    <Button colorScheme="blue">Ver proyectos</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default MyComponent;
