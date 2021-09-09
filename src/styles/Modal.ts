import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const modalStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: "80%",
      backgroundColor: "#002233",
      boxShadow: theme?.shadows[4],
      padding: theme.spacing(2, 4, 3),
      outline: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      borderRadius: "10px",
      fontFamily: "Roboto",
    },
    headingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      fontSize: "12px",
    },
    headingTitle: {
      marginTop: "20px",
    },
  })
);

export default modalStyles;
