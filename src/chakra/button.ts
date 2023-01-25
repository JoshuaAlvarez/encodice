import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: "5px",
        fontSize: "11pt",
        fontWeight: 800,
        _focus: {
            boxShadow: "none",
        },
    },
    sizes: {
        sm: {
            fontSize: "9pt",
        },
        md: {
            fontSize: "11pt",
            // height: "28px",
        },
    },
    variants: {
        solid: {
            color: "white",
            bg: "#0A95FF",
            _hover: {
                bg: "#071487",
            },
        },
        outline: {
            color: "#071487",
            border: "2px solid",
            borderColor: "#0A95FF",
        },
        oauth: {
            height: "35px",
            border: "2px solid",
            borderColor: "gray.400",
            _hover: {
                bg: "gray.60",
            },
        },
    },
};
