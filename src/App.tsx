import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import FlipMove from "react-flip-move";
import { AiFillDelete } from "react-icons/ai";
import useLocalStorage from "./hooks/useLocalStorage";
import modalBody from "./ModalComponent";
import "./styles.css";

export default function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [todoContent, setTodoContent] = useState<{
    todo: string;
    index: number;
  }>({
    todo: "",
    index: 0,
  });

  let { todosArray, clearTodos, addTodo, deleteTodo } = useLocalStorage();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addTodoHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.blur();
    if (value.trim().length >= 30) {
      enqueueSnackbar("Please enter todos which are less than 30 letters", {
        variant: "warning",
      });
      setValue("");
      inputRef.current?.blur();
      return;
    }
    if (value.trim()) {
      addTodo(value);
      setValue("");
      enqueueSnackbar("Todo created!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Please enter text to add a Todo", {
        variant: "warning",
      });
    }
  };

  const clearTodosHandler = () => {
    if (todosArray.length === 0) {
      enqueueSnackbar("No todos to clear", {
        variant: "warning",
      });
    } else {
      clearTodos();
      enqueueSnackbar("Cleared all Todos", {
        variant: "success",
      });
    }
  };

  const deleteHandler = (index: number) => {
    deleteTodo(index);
  };

  const handleModalOpen = (todo: string, index: number) => {
    setModalOpen(true);
    setTodoContent({
      todo: todo,
      index: index,
    });
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="App">
        <form
          action=""
          className="form"
          style={{
            marginRight: "20px",
            marginLeft: "20px",
            maxWidth: "640px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter a Todo"
            value={value}
            onChange={onChangeHandler}
            variant="outlined"
            fullWidth
            style={{
              margin: "20px",
              maxWidth: "90%",
              minWidth: "50%",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{
              marginBottom: "15px",
              width: "140px",
              maxWidth: "32%",
              minWidth: "32%",
            }}
            onClick={addTodoHandler}
          >
            Add Todo
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={clearTodosHandler}
            type="button"
            style={{
              marginBottom: "15px",
              width: "140px",
              maxWidth: "34%",
              minWidth: "32%",
            }}
          >
            Clear Todos
          </Button>
        </form>
        <List
          style={{
            margin: "20px",
          }}
        >
          <FlipMove
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            duration={400}
            leaveAnimation="accordionVertical"
          >
            {todosArray
              ? todosArray.map((todo, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemText
                        onClick={() => handleModalOpen(todo, index)}
                      >
                        {todo}
                      </ListItemText>
                      <ListItemIcon>
                        <AiFillDelete
                          className="del"
                          onClick={() => {
                            deleteHandler(index);
                          }}
                        />
                      </ListItemIcon>
                    </ListItem>
                  );
                })
              : null}
          </FlipMove>
        </List>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody({
          todoState: todoContent,
          todosArray: todosArray,
          modalOpenBoolean: setModalOpen,
        })}
      </Modal>
    </>
  );
}
