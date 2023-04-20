import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import Layout from "../components/Layout/Layout";

declare global {
  interface Window {
    ChatbotWidget: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const onLoadScript = () => {
    window?.ChatbotWidget?.default({
      rasaServerUrl: "http://localhost:5005/webhooks/rest/webhook",
      userId: null,
      initialPayload: "/greet",
      metadata: {},
      botAvatar: "/img/botAvatar.jpg",
      widgetColor: "#192f60",
      textColor: "white",
      userMsgBackgroundColor: "#192f60",
      botTitle: "EcoBot",
      botSubTitle: "Asistente Virtual de Encodice",
      botMsgBackgroundColor: "#f3f4f6",
      botResponseDelay: "",
      chatHeaderCss: {
        textColor: "white",
        backgroundColor: "#192f60",
        enableBotAvatarBorder: true,
      },
      chatHeaderTextColor: "#4c1d95",
      botMsgColor: "#4b5563",
      userMsgColor: "#4c1d95",
      embedded: false,
      buttonsCss: {
        color: "#5F8D4E",
        backgroundColor: "#5F8D4E",
        borderColor: "#5F8D4E",
        borderWidth: "0px",
        borderRadius: "999px",
        hoverBackgroundColor: "white",
        hoverColor: "#4b5563",
        hoverborderWidth: "1px",
        enableHover: false,
      },
    });
  };

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
      <div id="chatbot-container" className="chatbot-container">
        <Script id="bot_ui" src="/index.js" onLoad={onLoadScript} />
      </div>
    </RecoilRoot>
  );
}
