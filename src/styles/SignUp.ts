import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const SignUpStyles = makeStyles((theme: Theme) =>
  createStyles({
    parent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100vh",
      backgroundColor: "#002233",
      flexDirection: "column",
    },
    form: {
      display: "flex",
      alignItems: "self-start",
      justifyContent: "center",
      flexDirection: "column",
      width: "80%",
      maxWidth: "500px",
    },
    emailInput: {
      marginBottom: "30px",
    },
    passwordInput: {
      marginBottom: "20px",
    },
    buttons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      gap: "20px",
    },
    heading: {
      marginTop: "100px",
      width: "80%",
      maxWidth: "500px",
      marginBottom: "20px",
      fontSize: "1.6rem",
    },
    divider: {
      backgroundColor: "gray",
      width: "80%",
      maxWidth: "500px",
      marginBottom: "30px",
    },
    showPwd: {
      fontSize: "0.8rem",
    },
    switch: {
      marginBottom: "20px",
    },
    signUpLink: {
      fontSize: "0.8rem",
      marginTop: "20px",
      width: "80%",
      maxWidth: "500px",
    },
  })
);

export default SignUpStyles;
