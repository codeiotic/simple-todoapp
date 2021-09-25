import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const HeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#002233",
      zIndex: 100,
      boxShadow: theme.shadows[14],
    },
    imgParent: {
      width: "15%",
      maxWidth: "80px",
      minWidth: "70px",
      marginLeft: "5%", // originally 40px
    },
    img: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    linkParent: {
      "&:last-child": {
        marginRight: "20px", // originally 40px
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "30px",
    },
    links: {
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "lighter",
    },
  })
);

export default HeaderStyles;
