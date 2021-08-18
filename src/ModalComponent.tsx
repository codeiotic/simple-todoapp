import {
  Button,
  createStyles,
  Divider,
  makeStyles,
  TextField,
  Theme
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface ModalComponentProps {
  content: string;
  index: number;
  todosArray: string[];
  // modalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalComponent = ({
  content,
  index,
  todosArray
}: // modalOpen
ModalComponentProps) => {
  const [value, setValue] = useState<string>(content);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        padding: theme.spacing(2, 4, 3),
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "Roboto"
      },
      heading: {},
      headingContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        fontSize: "12px"
      }
    })
  );

  const classes = useStyles();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    let inputVal = e.target.value;
    if (inputVal.trim() !== "" && inputVal.trim() !== content) {
      setDisabled(false);
    } else if (inputVal.trim() === content) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const changeTodo = () => {
    todosArray.forEach((todo, indexNum, arr) => {
      if (indexNum === index) {
        todosArray[index] = value;
        localStorage.setItem("todos", JSON.stringify(todosArray));
        // modalOpen(false);
        enqueueSnackbar("Todo successfully changed", {
          variant: "success"
        });
      }
    });
  };

  return (
    <div
      key={index}
      className={classes.paper}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
      <div className={classes.headingContainer}>
        <h2>Edit Todo</h2>
      </div>
      <Divider
        style={{
          marginTop: "15px",
          marginBottom: "15px",
          width: "100%",
          backgroundColor: "black"
        }}
      />
      <TextField
        id="standard-basic"
        label="Standard"
        value={value}
        onChange={onChangeHandler}
        style={{
          width: "100%"
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%"
        }}>
        <Button
          variant="contained"
          color="primary"
          onClick={changeTodo}
          style={{
            marginTop: "20px"
          }}
          disabled={disabled}>
          Change Todo
        </Button>
      </div>
    </div>
  );
};

export default ModalComponent;
