import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const HomeStyles = makeStyles((theme: Theme) =>
  createStyles({
    parent: {
      backgroundColor: "#002233",
      marginTop: "60px",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      flexDirection: "column",
    },
    heading: {
      fontSize: "1.7rem",
      marginTop: "20px",
    },
    ghosted: {
      marginTop: "10px",
      opacity: 0.5,
    },
  })
);

export default HomeStyles;
