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
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "column",
      borderRadius: "10px",
      fontFamily: "Roboto",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
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
    divider: {
      marginTop: "15px",
      marginBottom: "15px",
      width: "100%",
      backgroundColor: "white",
    },
    input: {
      width: "50%",
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
    },
    deleteButton: {
      marginTop: "20px",
      marginLeft: "20px",
    },
    editButton: {
      marginTop: "20px",
    },
    time: {
      fontSize: "0.9rem",
      color: "lightgray",
      marginTop: "20px",
    },
  })
);

export default modalStyles;
