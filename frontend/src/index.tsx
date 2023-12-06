import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(container);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <GoogleOAuthProvider clientId={clientId}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
