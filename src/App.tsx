import {
  Backdrop,
  Button,
  Fade,
  List,
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
import { ChangeEvent, MouseEvent, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles.css";
import modalBody from "./ModalComponent";
import AppStyles from "./styles/App";
import FlipMove from "react-flip-move";
import { TodosSchema } from "./hooks/useLocalStorage";
import TodoItem from "./TodoItem";
import { DraggableProvided, DroppableProvided } from "react-beautiful-dnd";

export default function App(): JSX.Element {
  // ! IMPORTANT
  // ! When the user deletes an Todo at an random index,
  // ! The dragging is messed up (not really, but it's a good idea to keep this in mind)
  // ! Add such a system that will re-arrange the index in the order 1 - 2 - 3 - 4 - 5...

  const className = AppStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [todoContent, setTodoContent] = useState<TodosSchema>({
    todos: "",
    index: 0,
    completed: false,
  });

  const { todosArray, clearTodos, addTodo, deleteTodo, updateTodo } =
    useLocalStorage();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const maxIndexValue = (): number => {
    let maxIndexArray: number[] = [];
    todosArray.map(({ index }: TodosSchema): void => {
      maxIndexArray.push(index);
    });
    maxIndexArray.sort((a: number, b: number): number => b - a);
    return maxIndexArray[0] || 0;
  };

  const addTodoHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (value.trim().length >= 30) {
      enqueueSnackbar("Please enter todos which are less than 30 letters", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      setValue("");
      return;
    }

    if (value.trim()) {
      addTodo({
        index: maxIndexValue() + 1,
        todos: value,
        completed: false,
      });
      setValue("");
    } else {
      enqueueSnackbar("Please enter text to add a Todo", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    }
  };

  const clearTodosHandler = (): void => {
    if (todosArray.length === 0) {
      enqueueSnackbar("No todos to clear", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    } else {
      clearTodos();
    }
  };

  const handleModalOpen = (todo: string, completed: boolean, index: number) => {
    setModalOpen(true);
    setTodoContent({
      todos: todo,
      index: index,
      completed: completed,
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

  const deleteHandler = (index: number) => {
    deleteTodo(index);
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
              {(provided: DroppableProvided): JSX.Element => (
                <List
                  className={className.listParent}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <FlipMove>
                    {todosArray.map(
                      (
                        { todos, index, completed }: TodosSchema,
                        index2: number
                      ): JSX.Element => {
                        return (
                          <div
                            key={index2}
                            style={{
                              width: "100%",
                            }}
                          >
                            <Draggable
                              draggableId={String(index)}
                              index={index2}
                              key={index}
                            >
                              {(provided: DraggableProvided): JSX.Element => (
                                <TodoItem
                                  todos={todos}
                                  completed={completed}
                                  todoArrayIndex={index2}
                                  todoIndex={index}
                                  provided={provided}
                                  handleModalOpen={handleModalOpen}
                                  deleteTodo={deleteHandler}
                                />
                              )}
                            </Draggable>
                          </div>
                        );
                      }
                    )}
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
