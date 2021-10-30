import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const ErrorStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorBg: {
      padding: "15px",
      backgroundColor: "#760000",
      width: "100%",
      marginBottom: "20px",
      borderRadius: "7px",
      fontSize: "14px",
      boxShadow: theme.shadows[5],
      textAlign: "center",
    },
    list: {
      listStyleType: "none",
    },
  })
);

export default ErrorStyles;
