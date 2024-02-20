import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-center" />
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
