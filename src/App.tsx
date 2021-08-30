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
import AppStyles from "./styles/App";
import FlipMove from "react-flip-move";

export default function App() {
  const className = AppStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [todoContent, setTodoContent] = useState<{
    todo: string;
    index: number;
  }>({
    todo: "",
    index: 0,
  });

  let { todosArray, clearTodos, addTodo, deleteTodo, updateTodo } =
    useLocalStorage();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addTodoHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let todoAlreadyExists: boolean = false;
    todosArray.map((todo) => {
      if (Object.values(todo).indexOf(value) > -1) {
        setValue("");
        todoAlreadyExists = true;
        enqueueSnackbar(`"${value}" is already in the list`, {
          variant: "error",
        });
      } else {
        todoAlreadyExists = false;
      }
    });
    if (!todoAlreadyExists) {
      if (value.trim().length >= 30) {
        enqueueSnackbar("Please enter todos which are less than 30 letters", {
          variant: "warning",
          autoHideDuration: 2000,
        });
        setValue("");
        return;
      }
      if (value.trim() && !todoAlreadyExists) {
        addTodo({
          id: todosArray.length + 1,
          todos: value,
        });
        setValue("");
        enqueueSnackbar("Todo created!", {
          variant: "success",
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar("Please enter text to add a Todo", {
          variant: "warning",
          autoHideDuration: 2000,
        });
      }
    }
  };

  const clearTodosHandler = () => {
    if (todosArray.length === 0) {
      enqueueSnackbar("No todos to clear", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    } else {
      clearTodos();
      enqueueSnackbar("Cleared all Todos", {
        variant: "success",
        autoHideDuration: 2000,
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
      <div className={className.parent}>
        <div className={className.main}>
          <form action="" className={className.form}>
            <TextField
              id="outlined-basic"
              label="Enter a Todo"
              value={value}
              onChange={onChangeHandler}
              variant="outlined"
              fullWidth
              className={className.input}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={className.button}
              onClick={addTodoHandler}
            >
              Add
            </Button>

            <Button
              className={className.button}
              variant="contained"
              color="secondary"
              onClick={clearTodosHandler}
              type="button"
            >
              Clear All
            </Button>
          </form>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <List
                  className={className.listParent}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <FlipMove>
                    {todosArray.map(({ todos, id }, index) => {
                      return (
                        <div key={index}>
                          <Draggable
                            draggableId={String(id)}
                            index={index}
                            key={id}
                          >
                            {(provided) => (
                              <ListItem
                                className={className.list}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div
                                  onClick={() => handleModalOpen(todos, index)}
                                  className={className.listContentWrapper}
                                >
                                  <ListItemText>{todos}</ListItemText>
                                </div>
                                <ListItemIcon
                                  onClick={() => {
                                    deleteHandler(index);
                                  }}
                                >
                                  <AiFillDelete className={className.del} />
                                </ListItemIcon>
                              </ListItem>
                            )}
                          </Draggable>
                        </div>
                      );
                    })}
                  </FlipMove>
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
      </div>
      <img src="/assets/wave-haikei.svg" alt="" className={className.waves} />
    </>
  );
}
