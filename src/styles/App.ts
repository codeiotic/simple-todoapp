import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const AppStyles = makeStyles((theme: Theme) =>
  createStyles({
    parent: {
      backgroundColor: "#002233",
      minHeight: "70vh",
      width: "100%",
      marginTop: "60px",
    },
    main: {
      color: "white",
      margin: "0",
      padding: "0",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
    },
    form: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
      margin: "0 20px 0 20px",
      maxWidth: "640px",
    },
    input: {
      margin: "20px",
      width: "100%",
      outline: "none",
      borderRadius: "5px",
      marginBottom: "15px",
      maxWidth: "90%",
      minWidth: "50%",
    },
    button: {
      marginBottom: "15px",
      width: "140px",
      maxWidth: "34%",
      minWidth: "120px",
      height: "fit-content",
      outline: "none",
      borderRadius: "5px",
      transition: "all 0.1s ease-in-out",
      fontSize: "0.9rem",
      textAlign: "center",
      cursor: "pointer",
      boxShadow: theme.shadows[12],
      "&:last-child": {
        marginBottom: "20px",
      },
      "&:active": {
        transform: "scale(1.01)",
      },
      "&:hover": {
        boxShadow: theme.shadows[19],
      },
    },
    listParent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
      fontSize: "1.1rem",
      paddingBottom: "60px",
    },
    listContentWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    waves: {
      backgroundColor: "#002233",
      height: "auto",
      maxWidth: "100%",
      minWidth: "100%",
      marginTop: "-2px",
      position: "absolute",
      left: "0",
      right: "0",
    },
  })
);

export default AppStyles;
