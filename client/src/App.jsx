import "./App.css";
import Footer from "./components/Footer/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Router from "./routes/Router";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
