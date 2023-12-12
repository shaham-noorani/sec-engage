import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { AuthProvider } from "./modules/auth/AuthProvider";
import { UserProvider } from "./contexts/UserProvider";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(container);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <UserProvider>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </UserProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
