import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const SettingsStyles = makeStyles((theme: Theme) =>
  createStyles({
    parent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
      marginTop: "50px",
      flexDirection: "column",
      gap: "50px",
      backgroundColor: "#002233",
    },
  })
);

export default SettingsStyles;
