// 1. Import `extendTheme`
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import "@fontsource/nunito-sans";
import { extendTheme } from "@chakra-ui/react"
import { Button } from './button';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#F2740D",
    },
  },
  fonts: {
    body: "Nunito Sans, sans-serif", // https://www.npmjs.com/package/@fontsource/nunito-sans
  },
  styles: {
    global: () => ({
        body: {
            bg: "#F8F9F9",
        },
    }),
  },
  components: {
    Button,
  }
})
