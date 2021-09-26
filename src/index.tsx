import { SnackbarProvider } from "notistack";
import { render } from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");

render(
  <Router>
    <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
      <App />
    </SnackbarProvider>
  </Router>,
  rootElement
);
