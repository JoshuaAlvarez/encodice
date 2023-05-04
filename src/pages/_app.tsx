import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import Layout from "../components/Layout/Layout";
import React from "react";

declare global {
  interface Window {
    ChatbotWidget: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const onLoadScript = () => {
    window?.ChatbotWidget?.default({
      rasaServerUrl:
        "https://cea2-34-30-12-145.ngrok-free.app/webhooks/rest/webhook",
      userId: null,
      initialPayload: "/greet",
      metadata: {},
      botAvatar: "/img/ecobot_avatar.png",
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
        color: "white",
        backgroundColor: "#192f60",
        borderColor: "#192f60",
        borderWidth: "0px",
        borderRadius: "999px",
        hoverBackgroundColor: "#112a5f",
        hoverColor: "#192f60",
        hoverborderWidth: "0px",
        enableHover: true,
      },
    });
  };

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
          <div id="chatbot-container" className="chatbot-container">
            <Script id="bot_ui" src="/index.js" onLoad={onLoadScript} />
          </div>
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
