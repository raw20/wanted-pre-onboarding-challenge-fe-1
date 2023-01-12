import React from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import Footer from "./components/Footer/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Router from "./routes/Router";

const theme = createTheme();

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router />
        <Footer />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
