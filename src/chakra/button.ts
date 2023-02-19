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
        },
    },
    variants: {
        solid: {
            color: "black",
            bg: "white",
            border: "1px solid",
            borderColor: "black",
            _hover: {
                bg: "#F9F9F9",
                boxShadow:
                    'inset 0 0 0 1px white, inset 0 0 0 2px #ccc',
            },
            boxShadow:
                'inset 0px 1px 2px rgba(255,255,255,0.3), inset 0px -1px 2px rgba(0,0,0,1)',
        },
        outline: {
            color: "white",
            bg: "#192f60",
            border: "1px solid",
            borderColor: "#192f60",
            boxShadow:
                'inset 0px 1.5px 2px rgba(173,216,230,0.3), inset 0px -1px 2px rgba(255,255,255,0.3)',
            _hover: {
                color: "black",
                bg: "white",
                boxShadow:
                    'inset 0 0 1.5px 1px white, inset 0 0 0 2px #ccc',
            },
        },
        oauth: {
            height: "35px",
            border: "2px solid",
            borderColor: "gray.500",
            _hover: {
                bg: "gray.100",
            },
        },
    },
};
