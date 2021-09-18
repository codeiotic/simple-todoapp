import { SnackbarProvider } from "notistack";
import { render } from "react-dom";
import Main from "./Main";

const rootElement = document.getElementById("root");

render(
  <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
    <Main />
  </SnackbarProvider>,
  rootElement
);
