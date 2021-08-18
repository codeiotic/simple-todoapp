import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import FlipMove from "react-flip-move";
import { AiFillDelete } from "react-icons/ai";
import "./styles.css";
import ModalComponent from "./ModalComponent";

let todos2: string[] = [];

export default function App() {
  // Things to do:
  // Style the modal
  // Add some editing options to it

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let localStorageTodos = localStorage.getItem("todos");
    if (localStorageTodos) {
      let localStorageTodosArray: string[] = JSON.parse(localStorageTodos);
      localStorageTodosArray.map((localStorageTodo: string, index: number) => {
        todos2.push(localStorageTodo);
        setTodos(todos2);
      });
    }
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.blur();
    if (value.trim().length >= 30) {
      alert("Please enter todos which are less than 30 letters");
      setValue("");
      inputRef.current?.blur();
      return;
    }
    if (value.trim()) {
      todos2.push(value);
      setTodos(todos2);
      localStorage.setItem("todos", JSON.stringify(todos2));
      setValue("");
      enqueueSnackbar("Todo created!", {
        variant: "success"
      });
    } else {
      enqueueSnackbar("Please enter text to add a Todo", {
        variant: "error"
      });
    }
  };

  const clearTodos = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("todos");
    todos2 = [];
    setTodos([]);
    enqueueSnackbar("Cleared all Todos", {
      variant: "success"
    });
  };

  const deleteHandler = (index: number) => {
    todos2.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos2));
    let localStorageTodo = localStorage.getItem("todos");
    if (localStorageTodo) {
      let newTodoArray = JSON.parse(localStorageTodo);
      setTodos(newTodoArray);
    }
    enqueueSnackbar("Cleared Todo", {
      variant: "success"
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <form
        action=""
        className="form"
        style={{
          marginRight: "20px",
          marginLeft: "20px",
          maxWidth: "640px"
        }}>
        <TextField
          id="outlined-basic"
          label="Enter a Todo"
          value={value}
          onChange={onChangeHandler}
          variant="outlined"
          fullWidth
          style={{
            margin: "20px",
            maxWidth: "400px",
            flexGrow: 1
          }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            marginBottom: "15px",
            width: "140px"
          }}
          onClick={onClickHandler}>
          Add Todo
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={clearTodos}
          type="button"
          style={{
            marginBottom: "15px",
            width: "140px"
          }}>
          Clear Todos
        </Button>
      </form>
      <List>
        <FlipMove
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
          duration={400}
          leaveAnimation="accordionVertical">
          {todos
            ? todos.map((todo, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemText onClick={handleModalOpen}>
                      {todo}
                    </ListItemText>
                    <ListItemIcon>
                      <AiFillDelete
                        className="del"
                        onClick={(e) => {
                          deleteHandler(index);
                        }}
                      />
                    </ListItemIcon>
                    <Modal
                      open={modalOpen}
                      onClose={handleModalClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description">
                      {/* <ModalComponent
                        content={todo}
                        index={index}
                        todosArray={todos2}
                      /> */}
                      <div
                        style={{
                          backgroundColor: "white",
                          color: "black"
                        }}>
                        {todo}
                        {index}
                      </div>
                    </Modal>
                  </ListItem>
                );
              })
            : null}
        </FlipMove>
      </List>
    </div>
  );
}
