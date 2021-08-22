import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const modalStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: "#002233",
      boxShadow: theme?.shadows[4],
      padding: theme.spacing(2, 4, 3),
      outline: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "Roboto",
    },
    headingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      fontSize: "12px",
    },
  })
);

export default modalStyles;
