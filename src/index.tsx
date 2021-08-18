import { SnackbarProvider } from "notistack";
import { render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>,
  rootElement
);
