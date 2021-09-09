import { Button, Divider, TextField } from "@material-ui/core";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import modalStyles from "../styles/Modal";
import { useSnackbar } from "notistack";
import getTodoIndex from "../utils/getTodoIndex";

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
  const className = modalStyles();
  const [value, setValue] = useState<string>(todoState.todos);
  const [disabled, setDisabled] = useState<boolean>(true);

  const { enqueueSnackbar } = useSnackbar();
  let { deleteTodo, updateTodo } = useLocalStorage();

  useEffect((): void => {
    setValue(todoState.todos);
  }, [todoState.todos]);

  useEffect((): void => {
    setValue(todoState.todos);
    setDisabled(true);
  }, [modalOpenBooleanValue]);

  const changeTodo = (): void => {
    if (value.length >= 30) {
      enqueueSnackbar("Todo must be less than 30 characters", {
        variant: "error",
      });
      setValue(todoState.todos);
      return;
    }
    let localTodosArray = todosArray;

    let todoAlreadyExists: boolean = false;
    localTodosArray.map((todo: TodosSchema): void => {
      localTodosArray.sort((a: TodosSchema, b: TodosSchema): number => {
        return a.index - b.index;
      });
      if (Object.values(todo).indexOf(value) > -1) {
        todoAlreadyExists = true;
        setValue(todoState.todos);
        enqueueSnackbar(`"${value}" is already in the list`, {
          variant: "error",
        });
      }
    });

    if (!todoAlreadyExists) {
      localTodosArray.map(({ index }: TodosSchema): void => {
        if (index === todoState.index) {
          updateTodo({
            content: {
              index: index,
              todos: value,
              completed: false,
            },
            index: index,
          });
        }
      });
      modalOpenBoolean(false);
    }
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
    deleteTodo(getTodoIndex(todoState.index, todosArray));
    modalOpenBoolean(false);
  };

  return (
    <div key={todoState.index} className={className.paper}>
      <div className={className.headingContainer}>
        <h2 className={className.headingTitle}>Edit Todo</h2>
      </div>
      <Divider className={className.divider} />
      <TextField
        autoComplete="off"
        id="Todo"
        label="Change Todo"
        value={value}
        onChange={onChangeHandler}
        className={className.input}
      />
      <div className={className.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={changeTodo}
          className={className.editButton}
          disabled={disabled}
        >
          Change Todo
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={className.deleteButton}
          onClick={deleteTodoHandler}
        >
          Delete Todo
        </Button>
      </div>
    </div>
  );
};

export default modalBody;