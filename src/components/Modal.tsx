import { Button, Divider, TextField } from "@material-ui/core";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useLocalStorage, { TodosSchema } from "../hooks/useLocalStorage";
import modalStyles from "../styles/Modal";
import { useSnackbar } from "notistack";
import getTodoIndex from "../utils/getTodoIndex";
import validateTodo from "../utils/validate";
import moment from "moment";

export interface ModalComponentProps {
  todoState: TodosSchema;
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
  /* eslint-disable */
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
    let localTodosArray = todosArray;

    localTodosArray.sort((a: TodosSchema, b: TodosSchema): number => {
      return a.index - b.index;
    });

    let { errors, valid } = validateTodo(value, localTodosArray);

    if (valid) {
      localTodosArray.map(({ index, completed, time }: TodosSchema): void => {
        if (index === todoState.index) {
          updateTodo({
            content: {
              index: index,
              todos: value,
              completed: completed,
              time: new Date().toISOString(),
            },
            index: index,
          });
        }
      });
      modalOpenBoolean(false);
    } else {
      setValue(todoState.todos);
      enqueueSnackbar(errors, { variant: "error" });
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
      <div className={className.time}>
        {todoState.time
          ? `Last edited: ${moment(todoState.time).fromNow()}`
          : "Please clear all todos to see the last edited time"}
      </div>
    </div>
  );
};

export default modalBody;
