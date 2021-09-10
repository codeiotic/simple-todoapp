import { Theme, useMediaQuery } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const TodoItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
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
      width: "95%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "50px",
      padding: "15px",
      cursor: "pointer",
      minWidth: "300px",
      maxWidth: "800px",
    },
    menu: {
      "& .MuiPaper-root": {
        fontSize: "1rem",
        backgroundColor: "black",
        borderRadius: 6,
        marginTop: "40px",
        minWidth: 180,
        boxShadow:
          "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
          padding: 0,
        },
        "& .MuiListItem-root": {
          "&:hover": {
            backgroundColor: "#232323",
          },
        },
      },
    },
    divider: {
      borderBottom: "1px solid gray",
    },
    menuButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    arrowUp: {
      fontSize: "19px",
      cursor: "pointer",
      display: "flex",
    },
    arrowDown: {
      fontSize: "19px",
      cursor: "pointer",
    },
  })
);

export default TodoItemStyles;
