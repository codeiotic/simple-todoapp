import { Button, Divider, TextField } from "@material-ui/core";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import modalStyles from "./styles/Modal";

export interface TodosSchema {
  index: number;
  todos: string;
}
export interface ModalComponentProps {
  todoState: {
    todos: string;
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
  const [value, setValue] = useState<string>(todoState.todos);
  const [disabled, setDisabled] = useState<boolean>(true);
  let { deleteTodo, updateTodo } = useLocalStorage();

  useEffect((): void => {
    setValue(todoState.todos);
  }, [todoState.todos]);

  useEffect((): void => {
    setValue(todoState.todos);
    setDisabled(true);
  }, [modalOpenBooleanValue]);

  const changeTodo = (): void => {
    let localTodosArray = todosArray;
    localTodosArray.sort((a: TodosSchema, b: TodosSchema): number => {
      return a.index - b.index;
    });

    localTodosArray.map(
      ({ index, todos }: TodosSchema, index2: number): void => {
        if (index - 1 === todoState.index) {
          updateTodo({
            content: {
              // TODO: Remove id from here, find a better way to implement this
              index: todoState.index,
              todos: value,
              completed: false,
            },
            index: index - 1,
          });
        }
      }
    );

    modalOpenBoolean(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    let inputVal = e.target.value.trim();
    let todo = todoState.todos;

    if (inputVal !== "" && inputVal !== todo) {
      setDisabled(false);
    } else if (inputVal === todo) {
      setDisabled(true);
    } else if (value === todo) {
      setDisabled(true);
    } else {
      setDisabled(true);
    }
  };

  const deleteTodoHandler = (): void => {
    deleteTodo(todoState.index);
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
