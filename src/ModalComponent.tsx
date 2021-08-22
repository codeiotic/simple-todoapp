import { Button, Divider, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import modalStyles from "./styles/Modal";

interface TodosSchema {
  id: number;
  todos: string;
}
interface ModalComponentProps {
  todoState: {
    todo: string;
    index: number;
  };
  todosArray: TodosSchema[];
  modalOpenBoolean: Dispatch<SetStateAction<boolean>>;
  modalOpenBooleanValue: boolean;
}

const modalBody = ({
  todoState,
  todosArray,
  modalOpenBoolean,
  modalOpenBooleanValue,
}: ModalComponentProps): JSX.Element => {
  const classes = modalStyles();
  const [value, setValue] = useState<string>(todoState.todo);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let { deleteTodo, updateTodo } = useLocalStorage();

  useEffect(() => {
    setValue(todoState.todo);
  }, [todoState.todo]);

  useEffect(() => {
    setValue(todoState.todo);
    setDisabled(true);
  }, [modalOpenBooleanValue]);

  const changeTodo = () => {
    let localTodosArray = todosArray;
    localTodosArray.sort((a, b) => {
      return a.id - b.id;
    });

    localTodosArray.map(({ id, todos }, index) => {
      console.log([id, index, todoState.index]);
      if (id - 1 === todoState.index) {
        updateTodo({
          content: {
            // The id is not necessarily needed, but removing it will give some type errors
            // Will remove it in future commits
            // But for now it works like a charm :)
            id: todoState.index,
            todos: value,
          },
          index: id - 1,
        });
      }
    });

    enqueueSnackbar("Todo successfully changed", {
      variant: "success",
      autoHideDuration: 2000,
    });
    modalOpenBoolean(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    let inputVal = e.target.value;

    if (inputVal.trim() !== "" && inputVal.trim() !== todoState.todo) {
      setDisabled(false);
    } else if (inputVal.trim() === todoState.todo) {
      setDisabled(true);
    } else if (value.trim() === todoState.todo) {
      setDisabled(true);
    } else {
      setDisabled(true);
    }
  };

  const deleteTodoHandler = () => {
    deleteTodo(todoState.index);
    enqueueSnackbar("Todo deleted", {
      variant: "error",
      autoHideDuration: 2000,
    });
    modalOpenBoolean(false);
  };

  return (
    <div
      key={todoState.index}
      className={classes.paper}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={classes.headingContainer}>
        <h2>Edit Todo</h2>
      </div>
      <Divider
        style={{
          marginTop: "15px",
          marginBottom: "15px",
          width: "100%",
          backgroundColor: "white",
        }}
      />
      <TextField
        autoComplete="off"
        id="standard-basic"
        label="Standard"
        value={value}
        onChange={onChangeHandler}
        style={{
          width: "100%",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={changeTodo}
          style={{
            marginTop: "20px",
          }}
          disabled={disabled}
        >
          Change Todo
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
          }}
          onClick={deleteTodoHandler}
        >
          Delete Todo
        </Button>
      </div>
    </div>
  );
};

export default modalBody;
