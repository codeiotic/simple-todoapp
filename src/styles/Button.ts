import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const ButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    primaryButton: {
      "& .MuiButton-label": {
        color: "black",
      },
      backgroundColor: "#2acafe",
      "&:hover": {
        backgroundColor: "#5ed8ff",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: theme.shadows[5],
    },
    secondaryButton: {
      border: "1px solid white",
      boxShadow: theme.shadows[5],
    },
  })
);

export default ButtonStyles;
