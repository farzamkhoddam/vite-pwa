import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
