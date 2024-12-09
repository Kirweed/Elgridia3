import { ThemeProvider } from "styled-components";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "src/modules/auth/context/AuthProvider.tsx";

import App from "./App.tsx";
import { GlobalStyle, theme } from "./styles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
