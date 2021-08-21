import {
  Backdrop,
  Button,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
} from "@material-ui/core";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useSnackbar } from "notistack";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles.css";
import modalBody from "./ModalComponent";

export default function App() {
  // TODO: Look into the animations for the lists

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

  let { todosArray, clearTodos, addTodo, deleteTodo, setTodos, updateTodo } =
    useLocalStorage();

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
      addTodo({
        id: todosArray.length + 1,
        todos: value,
      });
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    let items = Array.from(todosArray);
    let [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTodo({ newTodosArr: items });
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <List
                className="todos"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  margin: "20px",
                }}
              >
                {todosArray.map(({ todos, id }, index) => {
                  return (
                    <Draggable draggableId={String(id)} index={index} key={id}>
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItemText
                            onClick={() => handleModalOpen(todos, index)}
                          >
                            {todos}
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
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          {modalBody({
            todoState: todoContent,
            todosArray: todosArray,
            modalOpenBoolean: setModalOpen,
            modalOpenBooleanValue: modalOpen,
          })}
        </Fade>
      </Modal>
    </>
  );
}
