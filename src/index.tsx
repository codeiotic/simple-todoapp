import { SnackbarProvider } from "notistack";
import { render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
    <App />
  </SnackbarProvider>,
  rootElement
);
