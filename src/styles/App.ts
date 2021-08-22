import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const AppStyles = makeStyles((theme: Theme) =>
  createStyles({
    parent: {
      backgroundColor: "#002233",
      minHeight: "70vh",
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
      minWidth: "32%",
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
      width: "60%",
      fontSize: "1.1rem",
      paddingBottom: "60px",
    },
    list: {
      "&:first-child": {
        borderTop: "1px solid white",
      },
      "&:hover": {
        "& svg": {
          display: "flex !important",
        },
      },
      marginTop: "10px",
      boxShadow: theme.shadows[24],
      borderRadius: "5px",
      listStyleType: "none",
      border: "1px solid white",
      borderTop: "none",
      width: "95%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "50px",
      padding: "15px",
      cursor: "pointer",
      minWidth: "300px",
    },
    del: {
      display: "none",
      fontSize: "19px !important",
      cursor: "pointer !important",
      marginLeft: "20px",
      color: "red",
      "&:hover": {
        color: "darkred !important",
      },
    },
    waves: {
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
